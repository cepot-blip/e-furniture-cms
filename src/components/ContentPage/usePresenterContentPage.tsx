import { Article, DialogType } from '@/lib/types';
import React from 'react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useDebounce, useDialog } from '@/hooks';
import useColumns from './blocks/Columns';

const dummyData: Article[] = [
  {
    id: '001',
    publishedDate: '2025-09-01',
    status: 'Published',
    totalViews: '20.000',
    categories: [
      {
        id: 'CAT-001',
        name: 'Chair',
      },
      {
        id: 'CAT-002',
        name: 'Sopa',
      },
    ],
    title: 'Ergonomic Office Chair with Lumbar Support',
  },
  {
    id: '002',
    publishedDate: '2025-09-01',
    status: 'Draft',
    categories: [
      {
        id: 'CAT-001',
        name: 'Bad',
      },
      {
        id: 'CAT-002',
        name: 'Table',
      },
    ],
    totalViews: '10.000',
    title: 'Modern Glass Coffee Table for Minimalist Spaces',
  },
  {
    id: '003',
    publishedDate: '2025-09-01',
    status: 'Published',
    categories: [
      {
        id: 'CAT-003',
        name: 'Wardrobe',
      },
      {
        id: 'CAT-003',
        name: 'Chair',
      },
    ],
    totalViews: '30.000',
    title: 'Luxury King-Size Bed with Upholstered Headboard',
  },
];

export default function usePresenterContentPage() {
  const [data, setData] = React.useState<Article[]>([]);
  const [query, setQuery] = React.useState<string>('');
  const [selectedArticle, setSelectedArticle] = React.useState<Article>({
    id: '',
    publishedDate: '',
    status: '',
    totalViews: '',
    categories: [],
    title: '',
  });

  const { isOpen, onOpen, onClose } = useDialog();
  const {
    isOpen: isNewArticleSheetOpen,
    onOpen: onNewArticleSheetOpen,
    onClose: onNewArticleSheetClose,
  } = useDialog();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = React.useState({});

  const fetchData = async () => {
    // const response = await fetch(`${url}/data`);
    // const res = await response.json();
    setData(dummyData);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleOpenDialog = (article: Article, dialogType: DialogType) => {
    console.log(dialogType);
    setSelectedArticle(article);
    onOpen();
  };

  const handleSearch = useDebounce((value: string) => {
    const loweredValue = value.toLowerCase();

    const result = dummyData.filter((item) => {
      if (loweredValue) {
        return item.title.toLowerCase().includes(loweredValue);
      }
      return item;
    });

    setData(result);
  }, 500);

  const handleInput = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setQuery(value);
    handleSearch(value);
  };

  const columns = useColumns(handleOpenDialog);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return {
    data,
    query,
    isOpen,
    isNewArticleSheetOpen,
    onNewArticleSheetOpen,
    onClose,
    onNewArticleSheetClose,
    selectedArticle,
    handleInput,
    handleOpenDialog,
    table,
  };
}
