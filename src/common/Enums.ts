export enum PaymentStatus {
    New = "UnPaid",
    PaymentReceived = "Payment received",
    PaymentFailed = "Payment failed",
    InProgress = "In progress",
    Completed = "Completed",
    Closed = "Closed",
    Canceled = "Overdue",
    FullyPaid = "Complete",
}

export enum UserRole {
    Customer = "Customer",
    Seller = "Seller",
    Admin = "Admin",
}