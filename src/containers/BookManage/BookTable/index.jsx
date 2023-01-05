import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import IOSSwitch from "../../../components/IOSSwitch";
import { StyledImage } from "../../../styles/Shared.styles";
import { useState } from "react";
import BookDetail from "./BookDetail";
import { EnableBookData } from "../../../api/Book";
import { useEffect } from "react";
import { UPLOAD_URL } from "../../../constants";

const BookTable = ({ tableData, getBookList, pageLimit }) => {
  const { data, page } = tableData;
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const onDetailOpen = (id) => {
    setDetailId(id);

    console.log(id)
    setDetailOpen(true);
  };

  const onEnableChange = ({ id, enable }) => {
    EnableBookData({
      is_enable: enable,
      id,
    }).then(() => {
      getBookList({ page_number: currentPage, page_limit: pageLimit });
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    getBookList({
      page_number: currentPage,
      page_limit: pageLimit,
    });
  }, [currentPage]);

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          minWidth: 650,
          borderRadius: "10px",
          borderColor: "transparent",
          fontSize: "14px",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow sx={{ color: "#505050" }}>
            <TableCell align="center">編號</TableCell>
            <TableCell align="center">圖片</TableCell>
            <TableCell align="center">書籍名稱</TableCell>
            <TableCell align="center">書籍款式</TableCell>
            <TableCell align="center">教材總類</TableCell>
            <TableCell align="center">經銷商</TableCell>
            <TableCell align="center">收藏數</TableCell>
            <TableCell align="center">評分</TableCell>
            <TableCell align="center">在架</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row,Index) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {row.id}
                </TableCell>
                <TableCell align="center">
                  <StyledImage
                    src={UPLOAD_URL + row.image}
                    width={51}
                    maxHeight={69}
                  />
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.model}</TableCell>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.dealer}</TableCell>
                <TableCell align="center">{row.collect}</TableCell>
                <TableCell align="center">{row.score}</TableCell>
                <TableCell align="center">
                  <IOSSwitch
                    sx={{ m: 1 }}
                    checked={row.is_enable}
                    inputProps={{ "aria-label": "Without label" }}
                    onChange={(e) =>
                      onEnableChange({ id: row.id, enable: e.target.checked })
                    }
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="text"
                      sx={{ color: "#92C66A", textDecoration: "underline" }}
                      onClick={() => onDetailOpen(row.id)}
                    >
                      查看詳細
                    </Button>
                    <Link to={`/book-manage/modify/?#id=${row.id}`}>

                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#A3D951",
                          width: 82,
                          height: 32,
                          "&:hover": {
                            background: "#92C66A",
                          },
                        }}
                      >
                        編輯
                      </Button>
                    </Link>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={10}>
              <Box
                sx={{
                  display: "flex",
                  fontSize: 12,
                  color: "#8c9eff",
                  mt: "60px",
                  mb: "20px",
                  ml: "24px",
                  justifyContent: "space-between",
                }}
              >
                {data && (
                  <Box>
                    顯示 {page?.page_total} 筆資料中的
                    {1 + pageLimit * (page?.page_number - 1)}到
                    {pageLimit * (page?.page_number - 1) + data.length}筆資料
                  </Box>
                )}
                <Box>
                  <Pagination
                    count={Number(page?.page_last || 0)}
                    variant="outlined"
                    shape="rounded"
                    page={currentPage}
                    onChange={handlePageChange}
                  />
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <BookDetail
        open={detailOpen}
        setDetailOpen={setDetailOpen}
        detailId={detailId}
      />
    </TableContainer >
  );
};

export default BookTable;
