export class ParametricasModel {
    documentTypes: any[];
    departments: any[];
    farm: any[];
    municipalities: any[];
    villages: any[];
    holdings: any[];
    varietiesCoffee: any[];
    renewals: any[];
    typeRenewals: any[];
    brightnesses: any[];
    typeSombers: any[];
    strokes: any[];
    units: any[];
    productTypes: any[];
    costType: any[];
    typeActivity: any[];
    stages: any[];
    typeWork: any[];
    typeCategory: any[];

    constructor( data?: any ) {
        this.documentTypes = data?.documentTypes ?? [];
        this.departments = data?.departments ?? [];
        this.farm = data?.farm ?? [];
        this.municipalities = data?.municipalities ?? [];
        this.villages = data?.villages ?? [];
        this.holdings = data?.holdings ?? [];
        this.varietiesCoffee = data?.varietiesCoffee ?? [];
        this.renewals = data?.renewals ?? [];
        this.typeRenewals = data?.typeRenewals ?? [];
        this.brightnesses = data?.brightnesses ?? [];
        this.typeSombers = data?.typeSombers ?? [];
        this.strokes = data?.strokes ?? [];
        this.units = data?.units ?? [];
        this.productTypes = data?.productTypes ?? [];
        this.costType = data?.costType ?? [];
        this.typeActivity = data?.typeActivity ?? [];
        this.stages = data?.stages ?? [];
        this.typeWork = data?.typeWork ?? [];
        this.typeCategory = data?.typeCategory ?? [];
    }
}