import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { changeToSeconds, convertToHMInString } from "./dateTime";
import { useState } from "react";
import { PaginationState } from "../components/CustomTableComponent";
import { XPagination } from "../pages/Employees/common/employee";
import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query/react";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getWorkingHours = (checkIn: string, checkOut: string) => {
  const checkInSecs = changeToSeconds(checkIn);
  const checkOutSecs = changeToSeconds(checkOut);
  const workHrs = checkOutSecs - checkInSecs;
  const workHrsTime = convertToHMInString(workHrs.toString());
  return workHrsTime;
};

/**
 *
 * @param initialSize -> number
 * @param pageCount -> number
 * @example const { limit, onPaginationChange, skip, pagination } = usePagination();
 */
export const usePagination = (initialSize: number = 10, pageCount?: number) => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: initialSize,
    pageIndex: 0,
    pageCount: pageCount,
    totalCount: 0,
  });
  const { pageSize, pageIndex } = pagination;

  return {
    pageSize: pageSize,
    onPaginationChange: setPagination,
    pagination,
    pageIndex: pageIndex,
  };
};

export const getPaginationMetaData = (meta: FetchBaseQueryMeta | undefined) => {
  let paginationState: XPagination | null = null;
  if (meta && meta.response) {
    paginationState = JSON.parse(
      meta?.response?.headers.get("x-pagination") ?? ""
    ) as XPagination;
  }
  return paginationState;
};

export const downloadBlobPdf = (data: Blob) => {
  const url = window.URL.createObjectURL(
    new Blob([data], { type: "application/pdf" })
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "report.pdf");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
