export class Customer {
    id = 0;
    name = '';
    addresses: Address[];
    tolerance = 0;
}

export class Address {
    street = '';
    city = '';
    state = '';
    zip = '';
}

export const states = ['CA', 'MD', 'OH', 'VA'];
