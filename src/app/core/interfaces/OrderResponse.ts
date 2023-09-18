export interface OrderResponse {
    total: number;
    tracking: any;
    cart: {
        configurations_relation: {
            configurations_id: {
                id: number;
                date_created: string;
                product: number;
                is_prescription: boolean;
                options_relation: number[];
                attributes_relation: number[];
            };
        }[];
        address: {
            id: number;
            date_created: string;
            date_updated: string | null;
            first_name: string | null;
            last_name: string | null;
            address: string;
            additional_address: string | null;
            postal_code: string;
            city: string;
            country: string;
            phone: string | null;
            user: string | null;
            guest: number;
        };
    };
    state: {
        title: string;
    };
    guest: {
        first_name: string;
        last_name: string;
    };
}
