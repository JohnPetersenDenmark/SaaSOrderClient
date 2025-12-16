import React, { useEffect, useState } from 'react';
//import styled from 'styled-components';
import type { Product } from '../../core/types/Product';
import AdminProductCreateEdit from './AdminProductCreateEdit';
import config from '../../config';
import { get , remove } from "../../core/api/axiosHttpClient";

/* import {
  AdminContainer,
  SectionWrapper,
  SectionTitle,
  GridHeaderPizza,
  GridHeaderTopping,
  GridRowPizza,
  GridRowTopping,
  ImageWrapper,
  ActionIcon,
  NewIconWrapper
} from './AdminLayoutStyles'; */

// ✅ Full-width responsive container
/* const Container = styled.div`
  width: 100%;
 
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
  font-size: 20px;
  color: #22191b;
  font-weight: 200;
`; */

const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const [isCreateEditProductModalOpen, setIsCreateEditProductModalOpen] = useState(false);
 
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
   const [reload, setReload] = useState(0); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response : any = await get('/Home/productlist');
        setProducts(response);
      } catch {
        setError('Failed to load pizzas');
      }
    };

    

    fetchProducts();
  
  }, [isCreateEditProductModalOpen,  submitting, reload]);

  const handleDeletePizza = async (product: Product) => {
    try {
      setSubmitting(true);
      await remove('/Admin/removeproduct/' + product.id);
      setReload(prev => prev + 1);
    } catch {
      setError('Failed to delete product');
    } finally {
      setSubmitting(false);
    }
  };



  const handleCloseCreateEditPizzaModal = () => { 
    setIsCreateEditProductModalOpen(false);
      setReload(prev => prev + 1);
  };

  


  return (
    <div>
      <AdminProductCreateEdit
        isOpen={isCreateEditProductModalOpen}
        onClose={() => handleCloseCreateEditPizzaModal()}
        productToEdit={productToEdit}
      />

    

      <div style={{ fontSize: '2rem',
      fontWeight: 600,
      color: '#22191b',
      margin: '20px',
      textAlign: 'center' as const,}}>Produkter</div>

      {/* Pizzas Section */}
      <div >
        <div>
          <div></div>
          <div>Nr.</div>
          <div>Navn</div>
          <div>Beskrivelse</div>
          {/*  <div>Pris før rabat</div>
          <div>Rabat %</div> */}
          <div>Pris efter rabat</div>
          <div></div>
          <div></div>
        </div>

        {products.map((product, index) => (
          <div key={index}>
            <div>
              <img src={`${config.apiBaseUrl}${product.imageurl}`} alt={product.name} />
            </div>
            <div>{product.productnumber}</div>
            <div>{product.name}</div>
            <div>{product.description}</div>
            {/*   <div>{pizza.discountprice.toFixed(2).replace('.', ',')}</div>
            <div>{pizza.discountpercentage}</div> */}
            <div>{product.price.toFixed(2).replace('.', ',')}</div>
            <div>
              <img
                src="/images/edit-icon.png"
                alt="Edit"
                onClick={() => {
                  setProductToEdit(product);
                  setIsCreateEditProductModalOpen(true);
                }}
              />
            </div>
            <div>
              <img
                src="/images/delete-icon.png"
                alt="Delete"
                onClick={() => handleDeletePizza(product)}
              />
            </div>
          </div>
        ))}


        <div>
          <img src="/images/new-icon.png" alt="Ny" onClick={() => {
            setProductToEdit(null);
            setIsCreateEditProductModalOpen(true);
          }} />
        </div>



      </div>

      {/* Toppings Section */}
    {/*   <SectionWrapper bgColor="white">
        <GridHeaderTopping>
          <div></div>
          <div>Tilbehør</div>
          <div>Beskrivelse</div>
          <div>Pris</div>

          <div></div>
          <div></div>

        </GridHeaderTopping> */}

       


        

      {/* </SectionWrapper> */}
    </div>
  );
};

export default AdminProducts;
