import { InMemoryDbService } from 'angular-in-memory-web-api';

import { EcommerceFakeData } from '@fake-db/ecommerce.data';
import { InvoiceFakeData } from '@fake-db/invoice.data';
import { UsersFakeData } from '@fake-db/users.data';

export class FakeDbService implements InMemoryDbService {
  createDb(): any {
    return {
      // Users
      'users-data': UsersFakeData.users,

      // Invoice
      'invoice-data': InvoiceFakeData.invoices,

      // E-Commerce
      'ecommerce-products': EcommerceFakeData.products,
      'ecommerce-relatedProducts': EcommerceFakeData.relatedProducts,
      'ecommerce-userWishlist': EcommerceFakeData.userWishlist,
      'ecommerce-userCart': EcommerceFakeData.userCart,
    };
  }
}
