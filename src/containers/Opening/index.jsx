import { Button } from "@mui/material";
import { useState, useEffect } from "react";

import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage, StyledText } from "../../styles/Shared.styles";

const Opening = () => {
  const [modal, setModal] = useState(false);
  const [startTime, setStartTime] = useState(false);
  const [endTime, setendTime] = useState(false);

  return (
    <>{modal === true ?
      <div style={{ position: "fixed", zIndex: "100", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyItems: "center", left: "0px", top: "0px", width: "100vw", height: "100vh" }}>
        <div style={{ position: "fixed", backgroundColor: "#FFFFFF", width: "30%", left: "35%", top: "20%", borderRadius: "20px" }}>
          <StyledFlexBox
            px={50}
            pt={30}
            fontFamily="Noto Sans TC"
          >
            <StyledText
              color="#252525"
              fontSize="16px"
              px={1}
              py={1}
              style={{ fontWeight: "700" }}

            >
              編輯
            </StyledText>
            <StyledText
              color="#252525"
              fontSize="16px"
              bg="#FFFF00"
              py={1}
              style={{ fontWeight: "700" }}

            >
              開放日期
            </StyledText>
          </StyledFlexBox>
          <StyledFlexBox
            borderRadius="10px 10px 0px 0px"
            px={50}
            pt={40}
            fontFamily="Noto Sans TC"
          >
            <StyledText
              color="#FB4A4A"
              fontSize="14px"
            >
              *
            </StyledText>
            <StyledText
              color="#505050"
              fontSize="14px"
              pl={1}
            >
              開放起始日
            </StyledText>
          </StyledFlexBox>
          <StyledFlexBox
            px={50}
            pt={10}
          >
            <input value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              type="date" style={{ width: "100%", padding: "1rem 0rem 1rem 1rem" }}></input>

          </StyledFlexBox>
          <StyledFlexBox
            borderRadius="10px 10px 0px 0px"
            px={50}
            pt={40}
            fontFamily="Noto Sans TC"
          >
            <StyledText
              color="#FB4A4A"
              fontSize="14px"
            >
              *
            </StyledText>
            <StyledText
              color="#505050"
              fontSize="14px"
              pl={1}
            >
              開放結束日
            </StyledText>
          </StyledFlexBox>
          <StyledFlexBox
            px={50}
            pt={10}
          >
            <input type="date" value={endTime}
              onChange={(e) => setendTime(e.target.value)}
              style={{ width: "100%", padding: "1rem 0rem 1rem 1rem" }}></input>

          </StyledFlexBox>
          <StyledFlexBox
            px={50}
            pt={80}
            pb={40}
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#FFFFFF", ml: "24px", color: "#A7A7A7", border: "1px solid #A7A7A7", width: "40%" }}
              onClick={() => { setModal(false) }}
            >
              取消
            </Button>

            <Button variant="contained" sx={{ backgroundColor: "#8C9EFF", ml: "24px", width: "40%" }} >儲存
            </Button>
          </StyledFlexBox>
        </div>
      </div> : ""}

      <Header />
      <LeftBar />
      <StyledFlexBox
        top={50}
        left={180}
        pt={40}
        px={50}
        flexDirection="column"
        maxWidth="calc(100% - 180px)"
        maxHeight="calc(100vh - 50px)"
        overflowX="auto"
        overflowY="auto"
      >
        <StyledFlexBox fontSize={24} fontWeight={700} mb={32} color="#242731">
          教材開放設定
        </StyledFlexBox>
        <StyledFlexBox
          bg="#fff"
          width={1144}
          height={452}
          borderRadius="10px"
          boxShadow="0px 2px 20px rgba(0, 0, 0, 0.05)"
          flexDirection="column"
        >
          <StyledFlexBox
            width="100%"
            height={60}
            bg="#f3f7ff"
            color="#8C9EFF"
            fontSize={20}
            fontWeight={500}
            alignItems="center"
            pl={24}
            borderRadius="10px 10px 0 0"
            mb={45}
          >
            朝陽獨家教材開放閱讀時間
          </StyledFlexBox>
          <StyledFlexBox
            color="#505050"
            fontSize={16}
            lineHeight="26px"
            fontWeight={500}
            mb={38}
            ml={50}
          >
            ※ 所有朝陽會員皆可於開放時間內觀看符合以下條件的書籍：
          </StyledFlexBox>
          <StyledFlexBox
            color="#505050"
            fontSize={16}
            fontWeight={500}
            ml={50}
            lineHeight="26px"
            mb={45}
          >
            書籍款式｜電子書 <br />
            教材種類｜朝陽獨家教材
          </StyledFlexBox>
          <StyledFlexBox
            color="#A7A7A7"
            fontSize={16}
            lineHeight="26px"
            fontWeight={500}
            mb={11}
            ml={50}
          >
            開放閱讀時間
          </StyledFlexBox>
          <StyledFlexBox
            color="#505050"
            fontSize={28}
            fontWeight={500}
            mb={24}
            ml={50}
          >
            2022/09/01 - 2023/01/31
          </StyledFlexBox>
          <Button variant="contained" sx={{ ml: "50px" }} onClick={() => { setModal(true) }}>
            編輯開放時間
          </Button>
        </StyledFlexBox>
      </StyledFlexBox>
    </>
  );
};

export default Opening;
