import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import queryString from "query-string";
import { useState, useCallback } from "react";
import "braft-editor/dist/index.css";

import Header from "../../../components/Header";
import LeftBar from "../../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../../styles/Shared.styles";
import BraftEditor from "braft-editor";

import { useNavigate } from "react-router-dom";
import FileUpload from "../../../components/FileUpload";
import { useEffect } from "react";
import { ModifyBookData, fetchBookData } from "../../../api/Book";
import {
  fetchCategorySelect,
  fetchSubjectSelect,
  fetchVersionSelect,

} from "../../../api/Category";
import { fetchSubDealerSelect } from "../../../api/SubDealer";
import moment from "moment";
import { SUCCESS_CODE } from "../../../constants";

const EDITOR_CONTROLS = [
  "line-height",
  "letter-spacing",
  "separator",
  "bold",
  "italic",
  "underline",
  "strike-through",
  "separator",
  "headings",
  "list-ul",
  "list-ol",
  "blockquote",
  "code",
  "separator",
  "link",
  "separator",
  "hr",
  "separator",
  "media",
];

const ModifyBook = () => {
  const GRADE_OPTIONS = [
    { value: "ONE", text: "一年級" },
    { value: "TWO", text: "二年級" },
    { value: "THREE", text: "三年級" },
    { value: "FOUR", text: "四年級" },
    { value: "FIVE", text: "五年級" },
    { value: "SIX", text: "六年級" },
  ];
  const navigate = useNavigate();
  const parsedHash = queryString.parse(window.location.hash);

  const [modoifyData, setModoifyData] = useState([]);
  const [getData, setGetData] = useState(0);

  const [model, setModel] = useState("SUBSCRIPTION");
  const [type, setType] = useState("CHAOYANG");

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [about, setAbout] = useState("");
  const [content, setContent] = useState("");
  const [originPrice, setOriginPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [whosalePrice, setWhosalePrice] = useState("");
  const [categoryOption, setCategoryOption] = useState([]);
  const [category, setCategory] = useState("");
  const [grade, setGrade] = useState(GRADE_OPTIONS[0].value);
  const [subjectOption, setSubjectOption] = useState([]);
  const [subject, setSubject] = useState("");
  const [versionOption, setVersionOption] = useState([]);
  const [version, setVersion] = useState("");
  const [dealerOption, setDealerOption] = useState([]);
  const [dealer, setDealer] = useState("");
  const [publishDate, setPublishDate] = useState("");

  const [imageFile, setImageFile] = useState([]);
  const [trialFile, setTrialFile] = useState("");
  const [ebookFile, setEbookFile] = useState("");

  const [successToast, setSuccessToast] = useState(false);
  const Dataget = () => {
    if (getData < 1) {
      fetchBookData({
        id: parsedHash.id,
      }).then(({ data }) => {
        setModoifyData(data)
        setModel(data[0].model)
        setName(data[0].name)
        setContent(data[0].content)
        setDealer(data[0].dealer)
        setCategory(data[0].category)
        setAbout(data[0].about)
        setPublishDate(data[0].publish_date)
        setSubject(data[0].subject)
        setNumber(data[0].number)
        setType(data[0].type)
        setVersion(data[0].version)
      });
      console.log("modoifyData", modoifyData)
      setGetData(5)
    }
  }
  Dataget();

  const thumbs = imageFile.map((file, index) => (
    <StyledFlexBox
      border="1px dashed #E9E9E9"
      borderRadius="6px"
      width={171}
      height={200}
      justifyContent="center"
      alignItems="center"
      key={file.name}
      overflow="hidden"
      ml={index !== 0 ? "10px" : 0}
    >
      <StyledImage
        height={200}
        maxWidth={171}
        style={{ objectFit: "scale-down" }}
        src={file.preview}
        // Revoke data uri after image is loaded
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <StyledImage
        src="/images/icon-cancel.svg"
        position="absolute"
        top="5px"
        right="8px"
        cursor="pointer"
        onClick={() => {
          let tmp = [...imageFile];
          tmp.splice(index, 1);
          setImageFile(tmp);
        }}
      />
    </StyledFlexBox>
  ));

  const onDrop = useCallback((acceptedFiles) => {
    setImageFile(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const onTrialDrop = useCallback((acceptedFiles) => {
    setTrialFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);

  const onEbookDrop = useCallback((acceptedFiles) => {
    setEbookFile(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setImageFile([]);
    fetchCategorySelect({
      type: model === "PHYSICAL" ? "PHYSICAL" : "EBOOK",
    }).then(({ data }) => {
      console.log(data);
      setCategoryOption(data);
      setCategory(data[0].id);
    });
  }, [model]);

  useEffect(() => {
    fetchSubjectSelect({ category_id: category }).then(({ data }) => {
      console.log("category", category)
      setSubjectOption(data);
      setSubject(data[0]?.id || "");
    });
    if (model === "PHYSICAL") {
      fetchVersionSelect({ category_id: category }).then(({ data }) => {
        setVersionOption(data);
        setVersion(data[0].id);
      });
    }
  }, [category, model]);

  useEffect(() => {
    fetchSubDealerSelect().then(({ data }) => {
      setDealerOption(data);
      setDealer(data[0].id);
    });
  }, []);

  const ModifyBook = () => {
    const payload = {
      trialFile: trialFile || null,
      ebookFile: ebookFile || null,
      imageFile: imageFile,
      model,
      type,
      name,
      number,
      subject,
      category,
      version,
      publishDate: moment(publishDate).format("YYYY/MM") + "/01",
      dealer,
      about: about && about.toHTML(),
      content: content && content.toHTML(),
      originPrice,
      costPrice,
      whosalePrice,
      id: parsedHash.id
    };
    console.log(payload)
    ModifyBookData(payload).then(({ header }) => {
      if (header.code === SUCCESS_CODE) {
        setSuccessToast(true);
        setTimeout(() => {
          navigate("/book-manage");
        }, 3000);
      } else {
        alert(header.message);
      }
    });
  };

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
          已修改「{name}」書籍
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
          修改書籍
        </StyledFlexBox>
        <StyledFlexBox
          bg="#fff"
          width={1144}
          borderRadius="10px"
          boxShadow="0px 2px 20px rgba(0, 0, 0, 0.05)"
          flexDirection="column"
        >
          <StyledFlexBox
            width="100%"
            height={60}
            bg="#8C9EFF"
            color="#fff"
            fontSize={20}
            fontWeight={500}
            alignItems="center"
            pl={24}
            borderRadius="10px 10px 0 0"
            mb={32}
          >
            書籍資訊
          </StyledFlexBox>
          <StyledFlexBox px={40} flexDirection="column">
            <StyledFlexBox>
              <FormControl sx={{ width: "520px", marginRight: "24px" }}>
                <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                  <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                  書籍款式
                </StyledFlexBox>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={model}
                >
                  <FormControlLabel
                    value="SUBSCRIPTION"
                    control={<Radio />}
                    label="電子書(訂閱制)"
                    onChange={(e) => setModel(e.target.value)}
                    defaultChecked
                  />
                  <FormControlLabel
                    value="FREE"
                    control={<Radio />}
                    label="電子書(免費)"
                    onChange={(e) => setModel(e.target.value)}
                  />
                  <FormControlLabel
                    value="PHYSICAL"
                    control={<Radio />}
                    label="實體書"
                    onChange={(e) => setModel(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ width: "520px" }}>
                <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                  <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                  教材種類
                </StyledFlexBox>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={type}
                >
                  <FormControlLabel
                    value="CHAOYANG"
                    control={<Radio />}
                    label="朝陽獨家教材"
                    onChange={(e) => setType(e.target.value)}
                  />
                  <FormControlLabel
                    value="OTHERS"
                    control={<Radio />}
                    label="課外書"
                    onChange={(e) => setType(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
            </StyledFlexBox>
            <StyledFlexBox mt={40} mb={32}>
              {/*  書籍圖片 */}
              <StyledFlexBox
                flexDirection="column"
                width={model === "PHYSICAL" ? 1064 : 520}
                mr={model === "PHYSICAL" ? 0 : 24}
              >
                <StyledFlexBox>
                  <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                    <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                    書籍圖片{model === "PHYSICAL" && "(可上傳多張圖片)"}
                  </StyledFlexBox>
                </StyledFlexBox>
                <StyledFlexBox alignItems="flex-end">
                  {imageFile.length > 0 && model !== "PHYSICAL" ? (
                    thumbs
                  ) : (
                    <FileUpload
                      multiple={model === "PHYSICAL"}
                      accept={{
                        "image/*": [".png", ".jpg"],
                      }}
                      onDrop={onDrop}
                    >
                      <p>
                        請將檔案拖曳至此
                        <br />
                        或點擊此處上傳圖片
                      </p>
                    </FileUpload>
                  )}
                  <StyledFlexBox color="#7c7c7c" marginLeft="16px">
                    {model === "PHYSICAL" && (
                      <>
                        註：將以上傳的第一張圖片作為書籍封面圖片
                        <br />
                        <br />
                      </>
                    )}
                    註：圖片格式為 Jpg 或 Png 檔案
                  </StyledFlexBox>
                </StyledFlexBox>
                {model === "PHYSICAL" && (
                  <StyledFlexBox mt={32}>{thumbs}</StyledFlexBox>
                )}
              </StyledFlexBox>
              {/*  免費試閱檔案 */}
              <StyledFlexBox
                flexDirection="column"
                width={520}
                display={model === "PHYSICAL" ? "none" : "flex"}
              >
                <StyledFlexBox>
                  <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                    <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                    免費試閱檔案
                  </StyledFlexBox>
                </StyledFlexBox>
                <StyledFlexBox alignItems="flex-end">
                  {trialFile ? (
                    <StyledFlexBox color="#505050" alignItems="center" mt={30}>
                      <StyledImage
                        src="/images/icon-pdf.svg"
                        onClick={() => setTrialFile("")}
                        cursor="pointer"
                        mr={30}
                      />
                      {trialFile.name}
                    </StyledFlexBox>
                  ) : (
                    <>
                      <FileUpload
                        accept={{
                          "application/pdf": [".pdf"],
                        }}
                        onDrop={onTrialDrop}
                      >
                        <p>
                          請將檔案拖曳至此
                          <br />
                          或點擊此處上傳檔案
                        </p>
                      </FileUpload>
                      <StyledFlexBox color="#7c7c7c" marginLeft="16px">
                        註：圖片格式為 Pdf 檔案
                      </StyledFlexBox>
                    </>
                  )}
                </StyledFlexBox>
              </StyledFlexBox>
            </StyledFlexBox>
            {/* Row 3 */}
            <StyledFlexBox mb={32}>
              <FormControl sx={{ width: "520px", marginRight: "24px" }}>
                <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                  <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                  書籍名稱
                </StyledFlexBox>
                <OutlinedInput
                  value={name}
                  placeholder="請輸入書籍名稱"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  sx={{
                    height: "40px",
                    width: "520px",
                    border: "1px solid #E9E9E9",
                  }}
                />
              </FormControl>
              <FormControl sx={{ width: "520px" }}>
                <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                  <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                  書籍編號
                </StyledFlexBox>
                <OutlinedInput
                  value={number}
                  placeholder="請輸入書籍編號"
                  onChange={(e) => setNumber(e.target.value)}
                  type="text"
                  sx={{
                    height: "40px",
                    width: "520px",
                    border: "1px solid #E9E9E9",
                  }}
                />
              </FormControl>
            </StyledFlexBox>
            {/* Row 4 */}
            <StyledFlexBox mb={32}>
              <FormControl
                sx={{
                  width: model === "PHYSICAL" ? "248px" : "520px",
                  marginRight: "24px",
                }}
              >
                <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                  <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                  分類
                </StyledFlexBox>
                <Select
                  displayEmpty
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  variant="outlined"
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    fontSize: 14,
                    width: model === "PHYSICAL" ? "248px" : "520px",
                    height: 40,
                    color: "#505050",
                    border: "1px solid #E9E9E9",
                  }}
                >
                  <MenuItem disabled value="">
                    <em>請選擇分類</em>
                  </MenuItem>
                  {categoryOption.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {model === "PHYSICAL" && (
                <FormControl
                  sx={{
                    width: "248px",
                    marginRight: "24px",
                  }}
                >
                  <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                    <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                    年級
                  </StyledFlexBox>
                  <Select
                    displayEmpty
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    variant="outlined"
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      fontSize: 14,
                      width: model === "PHYSICAL" ? "248px" : "520px",
                      height: 40,
                      color: "#505050",
                      border: "1px solid #E9E9E9",
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>請選擇年級</em>
                    </MenuItem>
                    {GRADE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.text}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
              <FormControl
                sx={{
                  width: model === "PHYSICAL" ? "248px" : "520px",
                  marginRight: model === "PHYSICAL" ? "24px" : 0,
                }}
              >
                <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                  <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                  主題
                </StyledFlexBox>
                <Select
                  displayEmpty
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  variant="outlined"
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    fontSize: 14,
                    width: model === "PHYSICAL" ? "248px" : "520px",
                    height: 40,
                    color: "#505050",
                    border: "1px solid #E9E9E9",
                  }}
                >
                  <MenuItem disabled value="">
                    <em>請選擇主題</em>
                  </MenuItem>
                  {subjectOption.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {model === "PHYSICAL" && (
                <FormControl
                  sx={{ width: model === "PHYSICAL" ? "248px" : "520px" }}
                >
                  <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                    <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                    版本
                  </StyledFlexBox>
                  <Select
                    displayEmpty
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    variant="outlined"
                    inputProps={{ "aria-label": "Without label" }}
                    sx={{
                      fontSize: 14,
                      width: model === "PHYSICAL" ? "248px" : "520px",
                      height: 40,
                      color: "#505050",
                      border: "1px solid #E9E9E9",
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>請選擇版本</em>
                    </MenuItem>
                    {versionOption.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </StyledFlexBox>
            {/* Row 5 */}
            {model === "PHYSICAL" ? (
              <StyledFlexBox mb={32}>
                <StyledFlexBox flexDirection="column" mr={75}>
                  <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                    <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                    實體書原價
                  </StyledFlexBox>
                  <StyledFlexBox color="#505050" alignItems="center">
                    原價:
                    <OutlinedInput
                      value={originPrice}
                      placeholder="請輸入價格"
                      onChange={(e) => setOriginPrice(e.target.value)}
                      type="text"
                      sx={{
                        height: "40px",
                        width: "132px",
                        border: "1px solid #E9E9E9",
                        margin: "0 8px",
                      }}
                    />
                    元
                  </StyledFlexBox>
                </StyledFlexBox>
                <StyledFlexBox flexDirection="column" mr={75}>
                  <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                    <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                    實體書成本價
                  </StyledFlexBox>
                  <StyledFlexBox color="#505050" alignItems="center">
                    成本價:
                    <OutlinedInput
                      value={costPrice}
                      placeholder="請輸入價格"
                      onChange={(e) => setCostPrice(e.target.value)}
                      type="text"
                      sx={{
                        height: "40px",
                        width: "132px",
                        border: "1px solid #E9E9E9",
                        margin: "0 8px",
                      }}
                    />
                    元
                  </StyledFlexBox>
                </StyledFlexBox>
                <StyledFlexBox flexDirection="column">
                  <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                    <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                    實體書批發價
                  </StyledFlexBox>
                  <StyledFlexBox color="#505050" alignItems="center">
                    批發價:
                    <OutlinedInput
                      value={whosalePrice}
                      placeholder="請輸入價格"
                      onChange={(e) => setWhosalePrice(e.target.value)}
                      type="text"
                      sx={{
                        height: "40px",
                        width: "132px",
                        border: "1px solid #E9E9E9",
                        margin: "0 8px",
                      }}
                    />
                    元
                  </StyledFlexBox>
                </StyledFlexBox>
              </StyledFlexBox>
            ) : (
              <StyledFlexBox mb={32}>
                {/*  電子書檔案 */}
                <StyledFlexBox flexDirection="column" width={520}>
                  <StyledFlexBox>
                    <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                      <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                      電子書檔案
                    </StyledFlexBox>
                  </StyledFlexBox>
                  <StyledFlexBox alignItems="flex-end">
                    {ebookFile ? (
                      <StyledFlexBox
                        color="#505050"
                        alignItems="center"
                        mt={30}
                      >
                        <StyledImage
                          src="/images/icon-pdf.svg"
                          onClick={() => setEbookFile("")}
                          cursor="pointer"
                          mr={30}
                        />
                        {ebookFile.name}
                      </StyledFlexBox>
                    ) : (
                      <>
                        <FileUpload
                          accept={{
                            "application/pdf": [".pdf"],
                          }}
                          onDrop={onEbookDrop}
                        >
                          <p>
                            請將檔案拖曳至此
                            <br />
                            或點擊此處上傳檔案
                          </p>
                        </FileUpload>
                        <StyledFlexBox color="#7c7c7c" marginLeft="16px">
                          註：圖片格式為 Pdf 檔案
                        </StyledFlexBox>
                      </>
                    )}
                  </StyledFlexBox>
                </StyledFlexBox>
              </StyledFlexBox>
            )}
            {/* Row 6 */}
            <StyledFlexBox mb={32}>
              <FormControl sx={{ width: "520px", marginRight: "24px" }}>
                <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                  <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                  出版日期
                </StyledFlexBox>
                <DesktopDatePicker
                  disableFuture
                  label=""
                  inputFormat="YYYY/MM"
                  value={publishDate}
                  onChange={(value) => {
                    setPublishDate(value);
                  }}
                  views={["year", "month"]}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        fontSize: 14,
                        width: 520,
                        height: "40px",
                        borderRadius: "4px",
                        border: "1px solid #E9E9E9",
                        ".MuiOutlinedInput-root": {
                          height: "40px",
                          color: "#505050",
                        },
                      }}
                      {...params}
                    />
                  )}
                />
              </FormControl>
              <FormControl sx={{ width: "520px" }}>
                <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                  <StyledFlexBox color="#FB4A4A">*&nbsp;</StyledFlexBox>
                  經銷商
                </StyledFlexBox>
                <Select
                  displayEmpty
                  value={dealer}
                  onChange={(e) => setDealer(e.target.value)}
                  variant="outlined"
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{
                    fontSize: 14,
                    width: 520,
                    height: 40,
                    color: "#505050",
                    border: "1px solid #E9E9E9",
                  }}
                >
                  <MenuItem disabled value="">
                    <em>請選擇經銷商</em>
                  </MenuItem>
                  {dealerOption.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </StyledFlexBox>
            <StyledFlexBox mb={32} flexDirection="column">
              <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                關於本書
              </StyledFlexBox>
              <BraftEditor
                value={about}
                onChange={(value) => setAbout(value)}
                language="zh-hant"
                style={{
                  borderRadius: "6px",
                  border: "1px solid #e9e9e9",
                }}
              />
            </StyledFlexBox>
            <StyledFlexBox mb={32} flexDirection="column">
              <StyledFlexBox color="#505050" fontWeight={500} mb="8px">
                目錄
              </StyledFlexBox>
              <BraftEditor
                value={content}
                onChange={(value) => setContent(value)}
                language="zh-hant"
                style={{
                  borderRadius: "6px",
                  border: "1px solid #e9e9e9",
                }}
              />
            </StyledFlexBox>
            <StyledFlexBox justifyContent="flex-end" mb={46}>
              <Button
                variant="outlined"
                sx={{ width: "120px", height: "40px", marginRight: "24px" }}
                onClick={goBack}
              >
                取消
              </Button>
              <Button
                disabled={!number || !name}
                variant="contained"
                sx={{ width: "120px", height: "40px" }}
                onClick={ModifyBook}
              >
                確定修改
              </Button>
            </StyledFlexBox>
          </StyledFlexBox>
        </StyledFlexBox>
      </StyledFlexBox>
    </>
  );
};

export default ModifyBook;
