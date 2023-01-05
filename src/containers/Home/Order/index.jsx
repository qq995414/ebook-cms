import { useState } from "react";
import { StyledFlexBox } from "../../../styles/Shared.styles";

const Order = () => {
  const [unit, setUnit] = useState("day");
  const ITEMS = [
    {
      text: "每日",
      value: "day",
    },
    {
      text: "每週",
      value: "week",
    },
    {
      text: "每月",
      value: "month",
    },
  ];
  const onUnitChange = (value) => {
    setUnit(value);
  };
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
          訂單數統計
        </StyledFlexBox>
        <StyledFlexBox>
          {ITEMS.map((item, index) => (
            <StyledFlexBox
              cursor="pointer"
              key={item.value}
              bg="#f6f6f6"
              py="6px"
              px="12px"
              color={unit === item.value ? "#4F4F4F" : "#bdbdbd"}
              fontSize={14}
              height={32}
              fontWeight={unit === item.value ? 700 : 400}
              alignItems="center"
              {...(index !== 0 && {
                borderLeft: "1px solid rgba(83, 90, 101, 0.2)",
              })}
              {...(index === 0 && {
                borderTopLeftRadius: "4px",
                borderBottomLeftRadius: "4px",
              })}
              {...(index === ITEMS.length - 1 && {
                borderTopRightRadius: "4px",
                borderBottomRightRadius: "4px",
              })}
              onClick={() => onUnitChange(item.value)}
            >
              {item.text}
            </StyledFlexBox>
          ))}
        </StyledFlexBox>
      </StyledFlexBox>
    </StyledFlexBox>
  );
};

export default Order;
