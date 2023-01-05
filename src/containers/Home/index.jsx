import Header from "../../components/Header";
import LeftBar from "../../components/LeftBar";
import { StyledFlexBox, StyledImage } from "../../styles/Shared.styles";
import Book from "./Book";
import Order from "./Order";
import Profit from "./Profit";
import Subscribe from "./Subscribe";

const OVERVIEW_ITEMS = [
  {
    text: "書本總數",
    icon: "/images/icon-book.svg",
    bg: "#A3D951",
  },
  {
    text: "會員總數",
    icon: "/images/icon-profile.svg",
    bg: "#8C9EFF",
  },
  {
    text: "訂閱總數",
    icon: "/images/icon-bookmarks.svg",
    bg: "#FF8956",
  },
  {
    text: "本日訂單數",
    icon: "/images/icon-bookmarks.svg",
    bg: "#13C2C2",
  },
];
const Home = () => {
  return (
    <>
      <Header />
      <LeftBar />
      <StyledFlexBox
        top={50}
        left={180}
        pt={40}
        px={50}
        flexDirection="column"
        maxWidth="calc(100% - 180px)"
        overflowX="auto"
        overflowY="auto"
        maxHeight="calc(100vh - 50px)"
      >
        <StyledFlexBox fontSize={24} fontWeight={700} mb={32} color="#242731">
          總覽
        </StyledFlexBox>
        <StyledFlexBox
          minWidth={1144}
          height={140}
          bg="#fff"
          borderRadius="10px"
          justifyContent="space-around"
          alignItems="center"
        >
          <StyledFlexBox flexDirection="column" py={30}>
            <StyledFlexBox
              fontSize={20}
              fontWeight={700}
              color="#242731"
              mb={2}
              pt={2}
              lineHeight="26px"
            >
              本日獲利
            </StyledFlexBox>
            <StyledFlexBox
              fontSize={18}
              fontWeight={500}
              color="#5055D6"
              alignItems="flex-end"
              mb={24}
              lineHeight="23px"
            >
              $0
              <StyledFlexBox
                fontSize={12}
                fontWeight={500}
                color="#A4A5A6"
                ml="5px"
                lineHeight="15.6px"
              >
                元
              </StyledFlexBox>
            </StyledFlexBox>
            <StyledFlexBox fontSize={14} fontWeight={500} color="#72767C">
              比昨日增加13.2%
            </StyledFlexBox>
          </StyledFlexBox>
          {OVERVIEW_ITEMS.map((item) => (
            <StyledFlexBox height={72} alignItems="center" key={item.text}>
              <StyledFlexBox
                width={56}
                height={56}
                borderRadius="50%"
                bg={item.bg}
                justifyContent="center"
                alignItems="center"
                mr="16px"
              >
                <StyledImage src={item.icon} />
              </StyledFlexBox>
              <StyledFlexBox flexDirection="column">
                <StyledFlexBox fontSize={16} color="#7c7c7c" mb="4px">
                  {item.text}
                </StyledFlexBox>
                <StyledFlexBox fontSize={28} fontWeight={700} color="#252525">
                  0
                </StyledFlexBox>
              </StyledFlexBox>
            </StyledFlexBox>
          ))}
        </StyledFlexBox>
        <StyledFlexBox mt={32} minWidth={1141} justifyContent="space-between">
          <Profit />
          <Book />
        </StyledFlexBox>
        <StyledFlexBox mt={32} minWidth={1141} pb={20} justifyContent="space-between">
          <Subscribe />
          <Order />
        </StyledFlexBox>
      </StyledFlexBox>
    </>
  );
};

export default Home;
