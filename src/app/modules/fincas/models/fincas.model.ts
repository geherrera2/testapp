export class FincasModel {
    id: string;
    cadastral_record: string;
    department_id: string;
    municipality_id: string;
    village_id: string;
    name: string;
    ubication: string;
    total_area: string;
    holding_id: string;
    department: string;
    municipality: string;
    village: string;
    holding: string;
    lotes: ListaLotesModel[];
    available_area: string;

    constructor(data) {
        this.id = data?.id ?? '';
        this.cadastral_record = data?.cadastral_record ?? '';
        this.department_id = data?.department_id ?? '';
        this.municipality_id = data?.municipality_id ?? '';
        this.village_id = data?.village_id ?? '';
        this.name = data?.name ?? '';
        this.ubication = data?.ubication ?? '';
        this.total_area = data?.total_area ?? '';
        this.holding_id = data?.holding_id ?? '';
        this.department = data?.department ?? '';
        this.municipality = data?.municipality ?? '';
        this.village = data?.village ?? '';
        this.holding = data?.holding ?? '';
        this.available_area = data?.available_area ?? '';
        this.lotes = data?.lot ?? [];
    }
}

export class ListaLotesModel {
    id: string;
    name: string;

    constructor(data) {
        this.id = data?.id;
        this.name = data?.name;
    }
}
