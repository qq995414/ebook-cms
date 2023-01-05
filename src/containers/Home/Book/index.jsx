import { useState } from "react";
import { StyledFlexBox } from "../../../styles/Shared.styles";

const Book = () => {
  return (
    <StyledFlexBox
      bg="#fff"
      borderRadius="16px"
      p={32}
      width={"49%"}
      height={313}
    >
      <StyledFlexBox
        justifyContent="space-between"
        alignItems="center"
        height="fit-content"
        width="100%"
      >
        <StyledFlexBox color="#0D0E12" fontSize={20}>
          書本種類統計
        </StyledFlexBox>
      </StyledFlexBox>
    </StyledFlexBox>
  );
};

export default Book;
