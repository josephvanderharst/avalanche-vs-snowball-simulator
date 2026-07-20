import { Debt } from "./debt";
import { FirstDraftMethod } from "./first-draft";


const debts: Debt[] = [
	{
		name: 'Motorcycle',
		amount: 7791.04,
		interestRate: 0.22,
		minPayment: null,
	},
	{
		name: 'Discover',
		amount: 5843.12,
		interestRate: 0.25,
		minPayment: null,
	},
	{
		name: 'Truck',
		amount: 3134.93,
		interestRate: 0.18,
		minPayment: null,
	},
	{
		name: 'Tires',
		amount: 463.00,
		interestRate: 0.10,
		minPayment: null,
	},
	{
		name: 'Car',
		amount: 9485.86,
		interestRate: 0.15,
		minPayment: null,
	},
	{
		name: 'HOA',
		amount: 850.00,
		interestRate: 0.17,
		minPayment: null,
	},
	{
		name: 'Ambulance',
		amount: 1000.00,
		interestRate: 0.05,
		minPayment: null,
	},
	{
		name: 'Bed',
		amount: 2855.16,
		interestRate: 0.16,
		minPayment: null,
	},
	{
		name: 'JSC',
		amount: 6644.77,
		interestRate: 0.15,
		minPayment: null,
	},
];

FirstDraftMethod(debts, 700.00);
