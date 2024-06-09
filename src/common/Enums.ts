export enum EPaymentStatus {
    New = "UnPaid",
    PaymentReceived = "Payment received",
    PaymentFailed = "Payment failed",
    InProgress = "In progress",
    Completed = "Completed",
    Closed = "Closed",
    Canceled = "Overdue",
    FullyPaid = "Complete",
}

export enum EUserRole {
    Customer = "Customer",
    Seller = "Seller",
    Admin = "Admin",
}

export enum EProductCategory {
    Shoes = "Shoes",
    Clothings = "Clothings",
    Accessories = "Accessories and Equipment"

}