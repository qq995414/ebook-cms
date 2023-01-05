import {
  Alert,
  Button,
  Snackbar,
} from "@mui/material";

import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../../../components/Header";
import LeftBar from "../../../components/LeftBar";
import { StyledFlexBox, StyledImage, StyledText } from "../../../styles/Shared.styles";
import fileDownload from 'js-file-download'

import ExcelFileUpload from "../../../components/ExcelUpload";
import { useEffect } from "react";
import { ModifyBookData } from "../../../api/Book";
import {
  fetchCategorySelect,
  fetchSubjectSelect,
  fetchVersionSelect,
  downloadXml,
  importBookData
} from "../../../api/Book";
import { fetchSubDealerSelect } from "../../../api/SubDealer";
import moment from "moment";
import { SUCCESS_CODE } from "../../../constants";


const batchBook = () => {
  const GRADE_OPTIONS = [
    { value: "ONE", text: "一年級" },
    { value: "TWO", text: "二年級" },
    { value: "THREE", text: "三年級" },
    { value: "FOUR", text: "四年級" },
    { value: "FIVE", text: "五年級" },
    { value: "SIX", text: "六年級" },
  ];

  const ITEMS = [
    {
      text: "匯入",
      value: "import",
    }, {
      text: "匯出",
      value: "output",
    },
  ];
  const [selected, setSelected] = useState("import");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [successToast, setSuccessToast] = useState(false);
  const goBack = () => {
    navigate(-1);
  };
  const [trialFile, setTrialFile] = useState("");
  const onTrialDrop = useCallback((acceptedFiles) => {
    setTrialFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);
  const importData = () => {
    const payload = {
      file: trialFile || null,
    };
    console.log(payload)

    importBookData(payload).then(({ data }) => {
      console.log(payload)
    });
  }

  return (
    <>
      <Header />
      <LeftBar />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={successToast}
        autoHideDuration={3000}
        onClose={() => setSuccessToast(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          已新增「{name}」書籍
        </Alert>
      </Snackbar>
      <StyledFlexBox
        top={50}
        left={180}
        py={40}
        px={50}
        flexDirection="column"
        maxWidth="calc(100% - 180px)"
        maxHeight="calc(100vh - 50px)"
        overflowX="auto"
        overflowY="auto"
      >
        <StyledFlexBox

          fontSize={24}
          fontWeight={700}
          mb={32}
          color="#242731"
          alignItems="center"
          onClick={goBack}
          cursor="pointer"
          width="fit-content"
        >
          <StyledImage src="/images/icon-left.svg" mr="12px" />
          批量匯入/出
        </StyledFlexBox>
        <StyledFlexBox ml="4px">
          {ITEMS.map((item) => (
            <StyledFlexBox
              key={item.value}
              borderRadius="10px 10px 0px 0px"
              bg={selected === item.value ? "#8C9EFF" : "#f6f6f6"}
              color={selected === item.value ? "#fff" : "#A7A7A7"}
              width={120}
              height={40}
              mr={10}
              justifyContent="center"
              alignItems="center"
              cursor="pointer"
              onClick={() => setSelected(item.value)}
            >
              匯出
            </StyledFlexBox>
          ))}
        </StyledFlexBox>
        <StyledText
          bg="#fff"
          borderRadius="15px"
          minWidth={1144}
          minHeight={540}
          mb={60}>
          <StyledFlexBox
            bg="#F3F7FF"
            width="100%"
            alignItems="center"
            height={80}
          >
            <StyledText
              color="#8C9EFF"
              fontSize="20px"
              ml={4}
              style={{ letterSpacing: "0.1em", fontWeight: "500" }}
            >
              圖書資料批量匯入
            </StyledText>

          </StyledFlexBox>
          <StyledFlexBox
            mt={50}
            ml={40}>

            <StyledImage height="350" src="/images/icon-batch.svg" />
            <StyledText
              ml={50}
            >
              <StyledFlexBox
                mt={10}
              >
                <div>
                  <StyledText
                    color="#200C9F"
                    fontSize="14px"
                    fontWeight="500"
                  >下載批量匯入模板
                  </StyledText>
                  <StyledText
                    color="#8C9EFF"
                    fontSize="12px"
                    fontWeight="400"
                    mt={20}
                  >註：批量匯入需使用此模板，以利資料匯入系統。
                  </StyledText>
                </div>


              </StyledFlexBox>
              <StyledFlexBox
                mt={90}
              >
                <div>
                  <StyledText
                    color="#200C9F"
                    fontSize="14px"
                    fontWeight="500"
                  >上傳批量匯入檔案
                  </StyledText>
                  <StyledText
                    color="#8C9EFF"
                    fontSize="12px"
                    fontWeight="400"
                    mt={20}
                  >註：將資料輸入於模板後，上傳至系統。
                  </StyledText>
                </div>

              </StyledFlexBox>
              <StyledFlexBox
                mt={90}
              >
                <div>
                  <StyledText
                    color="#200C9F"
                    fontSize="14px"
                    fontWeight="500"
                  >匯入圖書資料
                  </StyledText>
                  <StyledText
                    color="#8C9EFF"
                    fontSize="12px"
                    fontWeight="400"
                    mt={20}
                  >註：匯入資料後，請於圖書管理進行進階設定。
                  </StyledText>
                </div>

              </StyledFlexBox>
            </StyledText>
            <StyledText
              ml={50}
            >
              <StyledFlexBox
                mt={10}
              >

                <StyledText
                  ml={80}
                >
                  <a href="/file/sample.xlsx" target="_blank">
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#8C9EFF", ml: "24px" }}
                    >
                      下載檔案
                    </Button>
                  </a>
                </StyledText>

              </StyledFlexBox>
              <StyledFlexBox
                mt={105}
              >

                <StyledText
                  ml={80}
                >
                  {/**/}
                  <StyledFlexBox>

                    <ExcelFileUpload
                      onDrop={onTrialDrop}
                    >
                      {trialFile.name ? <Button
                        variant="contained"
                        sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#8C9EFF", border: "1px solid #8C9EFF" }}
                      >
                        選擇檔案
                      </Button> :

                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#8C9EFF", ml: "24px" }}
                        >
                          選擇檔案
                        </Button>
                      }
                    </ExcelFileUpload>
                    <StyledFlexBox color="#505050" alignItems="center" mt={30}>

                    </StyledFlexBox>

                    <StyledFlexBox color="#7c7c7c" marginLeft="30px" mt={2}>
                      {trialFile.name}
                    </StyledFlexBox>

                  </StyledFlexBox>


                </StyledText>
              </StyledFlexBox>
              <StyledFlexBox
                mt={90}
              >

                <StyledText
                  ml={80}
                >
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "#8C9EFF", ml: "24px" }}
                    onClick={() => importData()}
                  >
                    匯入
                  </Button>
                </StyledText>
              </StyledFlexBox>
            </StyledText>
          </StyledFlexBox>

        </StyledText>
      </StyledFlexBox >
    </>
  );
};

export default batchBook;
