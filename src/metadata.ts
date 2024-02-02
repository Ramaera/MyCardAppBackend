/* eslint-disable */
export default async () => {
    const t = {
        ["./transactions/entities/transaction.entity"]: await import("./transactions/entities/transaction.entity"),
        ["./card/entities/cardUser.entity"]: await import("./card/entities/cardUser.entity"),
        ["./payment-documents/entities/payment-document.entity"]: await import("./payment-documents/entities/payment-document.entity"),
        ["./users/models/user.model"]: await import("./users/models/user.model")
    };
    return { "@nestjs/swagger/plugin": { "models": [[import("./transactions/entities/transaction.entity"), { "CoupounCode": { couponCode: { required: true, type: () => String } }, "Transaction": { coupounCode: { required: true, type: () => String } } }], [import("./card/entities/cardUser.entity"), { "CardUserData": { name: { required: true, type: () => String }, email: { required: true, type: () => String }, mobileNumber: { required: true, type: () => String }, referralAgencyCode: { required: true, type: () => String } } }], [import("./payment-documents/entities/payment-document.entity"), { "PaymentDocument": { title: { required: true, type: () => String }, url: { required: true, type: () => String }, amount: { required: true, type: () => Number }, utrNo: { required: true, type: () => String }, status: { required: true, type: () => Object } } }], [import("./card/entities/card.entity"), { "Card": { cardNumber: { required: true, type: () => String }, isActive: { required: true, type: () => Boolean }, cardValue: { required: true, type: () => Number }, cardType: { required: true, type: () => Object }, maxDiscount: { required: true, type: () => Number }, cardValidity: { required: true, type: () => Number }, id: { required: true, type: () => Number }, transaction: { required: true, type: () => t["./transactions/entities/transaction.entity"].Transaction }, cardHolderUser: { required: true, type: () => t["./card/entities/cardUser.entity"].CardUserData }, Documents: { required: true, type: () => [t["./payment-documents/entities/payment-document.entity"].PaymentDocument] } } }], [import("./transactions/entities/message.entity"), { "Message": { message: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String }, "getHelloName": { type: String } } }], [import("./media-upload/media-upload.controller"), { "MediaUploadController": { "uploadSingle": {}, "getFile": {} } }]] }, "@nestjs/graphql/plugin": { "models": [[import("./auth/dto/signup.input"), { "SignupInput": { email: {}, password: {}, firstname: { nullable: true }, lastname: { nullable: true } } }], [import("./auth/models/token.model"), { "Token": { accessToken: {}, refreshToken: {} } }], [import("./common/models/base.model"), { "BaseModel": { id: {}, createdAt: {}, updatedAt: {} } }], [import("./transactions/entities/transaction.entity"), { "CoupounCode": { couponCode: {} }, "Transaction": { coupounCode: {} } }], [import("./card/entities/cardUser.entity"), { "CardUserData": { name: {}, email: {}, mobileNumber: {}, referralAgencyCode: {} } }], [import("./payment-documents/entities/payment-document.entity"), { "PaymentDocument": { title: {}, url: {}, amount: {}, utrNo: {}, status: {} } }], [import("./card/entities/card.entity"), { "Card": { cardNumber: {}, isActive: {}, cardValue: {}, cardType: {}, maxDiscount: {}, cardValidity: {}, id: {}, transaction: {}, cardHolderUser: {}, Documents: {} } }], [import("./users/models/user.model"), { "CardUser": { name: {}, email: {}, mobileNumber: {}, Role: {}, referralAgencyCode: {}, myCard: {} } }], [import("./auth/models/auth.model"), { "Authe": { carduser: { type: () => t["./users/models/user.model"].CardUser } } }], [import("./auth/dto/login.input"), { "LoginInputDTO": { email: {}, password: {} } }], [import("./auth/dto/refresh-token.input"), { "RefreshTokenInput": { token: {} } }], [import("./users/dto/change-password.input"), { "ChangePasswordInputDTO": { oldPassword: {}, newPassword: {} } }], [import("./users/dto/update-user.input"), { "UpdateCardUserInput": { firstname: { nullable: true }, lastname: { nullable: true } } }], [import("./users/dto/create-user.input"), { "CreateUserDto": { name: {}, email: {}, mobileNumber: {}, referralAgencyCode: {}, address: { nullable: true }, metaData: { nullable: true } } }], [import("./card/dto/generate-card.input"), { "GenerateCardDTO": { cardHolderId: {}, cardType: {} } }], [import("./card/dto/update-card.input"), { "UpdateCardInput": { id: {} } }], [import("./transactions/dto/coupoun-code.input"), { "CoupounCodeDto": { coupounCode: {}, cardNumber: {} } }], [import("./transactions/dto/transaction.input"), { "TransactionDto": { cardNumber: {}, coupounCode: {}, discountAmount: {}, metaData: {} } }], [import("./transactions/dto/send-transaction.input"), { "sendCodeDTO": { cardNumber: {}, discountAmount: {} } }], [import("./transactions/dto/update-transaction.input"), { "UpdateTransactionInput": { id: {} } }], [import("./transactions/entities/message.entity"), { "Message": { message: {} } }], [import("./payment-documents/dto/create-payment-document.input"), { "CreatePaymentDocumentInput": { title: {}, url: {}, amount: {}, utrNo: {}, myCardId: {}, cardUserId: {} } }], [import("./payment-documents/dto/update-payment-document.input"), { "UpdatePaymentDocumentInput": { id: {}, amount: {}, url: {}, utrNo: {} } }], [import("./payment-documents/dto/uppdate-documentStatus.input"), { "UpdateDocumentStatusByAdmin": { id: {}, status: {} } }], [import("./common/pagination/pagination.args"), { "PaginationArgs": { skip: { nullable: true, type: () => Number }, after: { nullable: true, type: () => String }, before: { nullable: true, type: () => String }, first: { nullable: true, type: () => Number }, last: { nullable: true, type: () => Number } } }], [import("./common/pagination/page-info.model"), { "PageInfo": { endCursor: { nullable: true }, hasNextPage: {}, hasPreviousPage: {}, startCursor: { nullable: true } } }]] } };
};