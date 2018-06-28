export class LC {
    lc_no : ReferenceNo;
    lc_customer: Customer;
    lc_amt: Amount;
    lc_balance: Amount;
}

export class ReferenceNo {
    id = '';
    protect = false;
    mandatory = true;
}

export class Amount {
    amt = 0;
    protect = false;
    mandatory = false;
}

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

export const customers: Customer[] = [
    {
        id: 1,
        name: 'Whirlwind',
        addresses: [
            { street: '123 Main', city: 'Anywhere', state: 'CA', zip: '94801' },
            { street: '456 Maple', city: 'Somewhere', state: 'VA', zip: '23226' },
        ],
        tolerance: 3
    },
    {
        id: 2,
        name: 'Bombastic',
        addresses: [
            { street: '789 Elm', city: 'Smallville', state: 'OH', zip: '04501' },
        ],
        tolerance: 5
    },
    {
        id: 3,
        name: 'Magneta',
        addresses: [],
        tolerance: 0
    },
];

export const states = ['CA', 'MD', 'OH', 'VA'];
