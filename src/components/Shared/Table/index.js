/**
 * @function CustomTable
 * @param {array} columns array of columns
 * @param {boolean} showPagination to show pagination of the table default is true
 * @param props.children  Body of the table
 */

import React from 'react';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '@mui/material';
import classNames from 'classnames';
import c from '../shared.Module.scss';
import Text from '../../Shared/Text';
import IconButton from '@mui/material/IconButton';
import SwitchLeftIcon from '@mui/icons-material/SwitchLeft';

const CustomTable = ({
  columns = [],
  onClick,
  showPagination = true,
  showSortIcon = true,
  minWidth = true,
  maxHeight,
  pageNo = 0,
  setTablePageNo = null,
  rowsPerPage = 10,
  setRowsPerPage = null,
  ...props
}) => {
  return (
    <>
      <TableContainer
        className={classNames(c.tableContainer, 'px-3')}
        sx={{ maxHeight: maxHeight }}
      >
        <Table stickyHeader aria-label="stickyTable" size="small">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column?.id} className={c.tableHeading}>
                  <Text
                    textType="t1"
                    classToOverride={classNames(
                      'fw-bold',
                      minWidth && c.tableWidth
                    )}
                  >
                    {column?.label}
                    {showSortIcon && (
                      <IconButton
                        className="ms-1"
                        onClick={() => Boolean(onClick) && onClick(column?.id)}
                      >
                        <SwitchLeftIcon className={c.tableSortIcon} />
                      </IconButton>
                    )}
                  </Text>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{props?.children}</TableBody>
        </Table>
      </TableContainer>
      {showPagination && (
        <TablePagination
          component="div"
          className={c.tablePagination}
          count={-1}
          rowsPerPageOptions={[10, 25, 100]}
          rowsPerPage={rowsPerPage}
          page={pageNo}
          onPageChange={(e, page) => {
            console.log('pageNo', page);
            if (setTablePageNo) setTablePageNo(page);
          }}
          onRowsPerPageChange={(e) => {
            console.log('rows per page changed', e?.target?.value);
            if (setRowsPerPage) setRowsPerPage(e?.target?.value);
          }}
        />
      )}
    </>
  );
};

export default CustomTable;
