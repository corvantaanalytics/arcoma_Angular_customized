export interface SalesDetails {
    id ?: string,
    transactionId?: string
    clientName: string,
    address: {
        addressLine1: string,
        addressLine2: string,
        city: string,
        state: string,
        pincode: string
      },
    amount?: string,
    paymentStatus?: string,
    paymentType?: string,
    orderStatus?: string,
    orderDate?: Date,
    createdat? : Date,
    createdby? : string
}