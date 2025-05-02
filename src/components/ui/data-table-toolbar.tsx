import type { Table } from "@tanstack/react-table"
import { X } from "lucide-react"
import type React from "react"
import { useEffect, useState } from "react"
import { type DateRange } from "react-day-picker"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DatePickerWithRange } from "../common/DatePickerWithRange"
import { DateTimePicker24h } from "../common/DateTimePicker24h"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filterableColumns?: FilterableColumns[]
  searchableColumns?: SearchableColumns[]
  deleteRowsAction?: React.MouseEventHandler<HTMLButtonElement>
}

export type FilterableColumns = {
  id: string
  title?: string
  options?: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  type?: FilterType
}

export type FilterType = "select" | "date-range" | "date-time"

export type SearchableColumns = {
  id: string
  title?: string
}

export function DataTableToolbar<TData>({
  table,
  filterableColumns = [],
  searchableColumns = [],
  deleteRowsAction,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const hasSearchableColumns = searchableColumns.length > 0
  const hasFilterableColumns = filterableColumns.length > 0

  // State for date picker values
  const [dateRanges, setDateRanges] = useState<Record<string, DateRange | undefined>>({})
  const [dateTimes, setDateTimes] = useState<Record<string, Date | undefined>>({})

  // Sync our local state with the table's filter state
  useEffect(() => {
    // Get all date-range and date-time columns
    const dateRangeColumns = filterableColumns.filter(col => col.type === "date-range").map(col => col.id);
    const dateTimeColumns = filterableColumns.filter(col => col.type === "date-time").map(col => col.id);

    // Get current column filters from the table
    const columnFilters = table.getState().columnFilters;

    // Update our state for date ranges
    const newDateRanges: Record<string, DateRange | undefined> = {};
    dateRangeColumns.forEach(columnId => {
      const filter = columnFilters.find(f => f.id === columnId);
      if (filter?.value) {
        newDateRanges[columnId] = filter.value as DateRange;
      } else {
        newDateRanges[columnId] = undefined;
      }
    });

    // Update our state for date times
    const newDateTimes: Record<string, Date | undefined> = {};
    dateTimeColumns.forEach(columnId => {
      const filter = columnFilters.find(f => f.id === columnId);
      if (filter?.value) {
        newDateTimes[columnId] = filter.value as Date;
      } else {
        newDateTimes[columnId] = undefined;
      }
    });

    // Set our local state - but only if it's different (to avoid infinite loops)
    if (JSON.stringify(newDateRanges) !== JSON.stringify(dateRanges)) {
      setDateRanges(newDateRanges);
    }

    if (JSON.stringify(newDateTimes) !== JSON.stringify(dateTimes)) {
      setDateTimes(newDateTimes);
    }
  }, [table.getState().columnFilters, filterableColumns]);

  const handleDateRangeChange = (columnId: string, dateRange: DateRange | undefined) => {
    // When null or undefined value is selected, clear the filter
    if (!dateRange || !dateRange.from) {
      table.getColumn(columnId)?.setFilterValue(undefined);
      return;
    }

    // Set the filter value - the table will store this and our useEffect will update the UI
    table.getColumn(columnId)?.setFilterValue({
      from: dateRange.from,
      to: dateRange.to || dateRange.from
    });
  };

  const handleDateTimeChange = (columnId: string, dateTime: Date | undefined) => {
    // Set the filter value - the table will store this and our useEffect will update the UI
    table.getColumn(columnId)?.setFilterValue(dateTime);
  };

  const handleResetFilters = () => {
    // This will reset all column filters
    table.resetColumnFilters();

    // Our useEffect will handle updating the UI based on the table's state
  }

  return (
    <div className="flex items-center justify-between flex-wrap gap-2">
      <div className="flex flex-1 items-center space-x-2 flex-wrap gap-2">
        {hasSearchableColumns && (
          <Input
            placeholder="Search..."
            value={(table.getColumn(searchableColumns[0]?.id)?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn(searchableColumns[0]?.id)?.setFilterValue(event.target.value)}
            className="h-9 w-[150px] lg:w-[250px]"
          />
        )}
        {hasFilterableColumns &&
          filterableColumns.map((column) => {
            if (!table.getColumn(column.id)) return null;

            if (column.type === "date-range") {
              return (
                <div key={column.id} className="flex flex-col gap-1 min-w-[240px]">
                  {column.title && (<p className="text-sm font-medium">{column.title}</p>)}

                  <DatePickerWithRange
                    date={dateRanges[column.id]}
                    onChange={(dateRange) => handleDateRangeChange(column.id, dateRange)}
                  />
                </div>
              );
            }

            if (column.type === "date-time") {
              return (
                <div key={column.id} className="flex flex-col gap-1 min-w-[240px]">
                  {column.title && (<p className="text-sm font-medium">{column.title}</p>)}
                  <DateTimePicker24h
                    date={dateTimes[column.id]}
                    onChange={(date) => handleDateTimeChange(column.id, date)}
                  />
                </div>
              );
            }

            if (column.options) {
              return (
                <DataTableFacetedFilter
                  key={column.id}
                  column={table.getColumn(column.id)}
                  title={column.title}
                  options={column.options}
                />
              );
            }

            return null;
          })}
        {isFiltered && (
          <Button variant="ghost" onClick={handleResetFilters} className="h-9 px-2 lg:px-3">
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 && (
          <Button variant="destructive" size="sm" onClick={deleteRowsAction} className="h-9">
            Delete ({table.getSelectedRowModel().rows.length})
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}