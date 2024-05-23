interface IActionsBase {
    data: any | null;
    success: boolean;
    message: string;
}

export interface IActionsCrud extends IActionsBase {

}