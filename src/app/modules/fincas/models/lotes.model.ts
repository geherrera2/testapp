export class LoteModel {

    id: string;
    name: string;
    total_area: string;
    ubication: string;
    above_sea_level: string;
    description: string;
    varietie_coffee_id: string;
    renewal_id: string;
    type_renewal_id: string;
    date_renewal: string;
    age: string;
    brightness_id: string;
    range_brightness: string;
    type_somber_id: string;
    stroke_id: string;
    distance_sites: string;
    distance_furrow: string;
    stems_sites: string;
    density_hectares: string;
    sites_crop: string;
    farm_id: string;
    created_at: string;
    updated_at: string;
    varietie_coffee: string;
    renewal: string;
    type_renewal: string;
    brightness: string;
    type_somber: string;
    stroke: string;
    number_plants: string;
    analisis: ListaAnalisisModel[];

    constructor(data) {
        this.id = data?.id ?? '';
        this.name = data?.name ?? '';
        this.total_area = data?.total_area ?? '';
        this.ubication = data?.ubication ?? '';
        this.above_sea_level = data?.above_sea_level ?? '';
        this.description = data?.description ?? '';
        this.varietie_coffee_id = data?.varietie_coffee_id ?? '';
        this.renewal_id = data?.renewal_id ?? '';
        this.type_renewal_id = data?.type_renewal_id ?? '';
        this.date_renewal = data?.date_renewal ?? '';
        this.age = data?.age ?? '';
        this.brightness_id = data?.brightness_id ?? '';
        this.range_brightness = data?.range_brightness ?? '';
        this.type_somber_id = data?.type_somber_id ?? '';
        this.stroke_id = data?.stroke_id ?? '';
        this.distance_sites = data?.distance_sites ?? '';
        this.distance_furrow = data?.distance_furrow ?? '';
        this.stems_sites = data?.stems_sites ?? '';
        this.density_hectares = data?.density_hectares ?? '';
        this.sites_crop = data?.sites_crop ?? '';
        this.farm_id = data?.farm_id ?? '';
        this.created_at = data?.created_at ?? '';
        this.updated_at = data?.updated_at ?? '';
        this.varietie_coffee = data?.varietie_coffee ?? '';
        this.renewal = data?.renewal ?? '';
        this.type_renewal = data?.type_renewal ?? '';
        this.brightness = data?.brightness ?? '';
        this.type_somber = data?.type_somber ?? '';
        this.stroke = data?.stroke ?? '';
        this.number_plants = data?.number_plants ?? '';
        this.analisis = data?.analisis ?? [];
    }
}

export class ListaAnalisisModel {
    id: string;
    analysis_date: string;

    constructor(data) {
        this.id = data?.id;
        this.analysis_date = data?.analysis_date;
    }
}

export class DetalleAnalisisModel {
    aluminum: string;
    analysis_date: string;
    calcium: string;
    id: string;
    lot_id: string;
    magnesium: string;
    organic_matter: string;
    ph: string;
    phosphates: string;
    potassium: string;
    sulphur: string;
    texture: string;

    constructor(data) {
        this.aluminum = data?.aluminum ?? '';
        this.analysis_date = data?.analysis_date ?? '';
        this.calcium = data?.calcium ?? '';
        this.id = data?.id ?? '';
        this.lot_id = data?.lot_id ?? '';
        this.magnesium = data?.magnesium ?? '';
        this.organic_matter = data?.organic_matter ?? '';
        this.ph = data?.ph ?? '';
        this.phosphates = data?.phosphates ?? '';
        this.potassium = data?.potassium ?? '';
        this.sulphur = data?.sulphur ?? '';
        this.texture = data?.texture ?? '';
    }
}
