"use client";

import React, { useState, useCallback, useEffect } from "react";
import { Product } from "@/types";
import { ProductModal } from "@/views/products/productModal/productModal";
import { BackToHome } from "@/components/backToHome/backToHome";
import { ProductList } from "@/views/products/productList/productList";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { usePagination } from "@/hooks/usePagination";
import { PRODUCTS_DATA } from "@/data/productsData";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Products: React.FC = () => {
  const searchParams = useSearchParams()
  const params = new URLSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });


  // ensuring the modal state persists after a page reload and works with the back/forward buttons in the browser.
  const productId = searchParams.get('product-id')
  useEffect(()=>{
    if(productId){
      const product = PRODUCTS_DATA.find(item => item.id === productId)
      if(!product) return
      handleOpenModal(product)
    }
  },[productId])

  //Update URL When Modal Opens (Products Page)
  const handleOpenModal = useCallback((product: Product) => {
    params.set('product-id',product.id)
    router.push(`${pathname}?${params.toString()}`)
    setSelectedProduct(product);
  }, []);

  const handleCloseModal = useCallback(() => {
    router.push(`${pathname}`) // Fix
    setSelectedProduct(null);
  }, []);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
