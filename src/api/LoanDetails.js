import axios from 'axios';
import { genericFetch } from '../../utils';
import { config } from '../../config';

export async function loanVehicleDetails(token, leadCode) {

	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: {
			lead_code: leadCode
		},
		url: config.LOAN_VEHICLEDETAILS,
	};

	try {
		const apiResponse = await axios(requestOption)
		return genericFetch(apiResponse);

	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}

export async function getSchemeCode(token, data) {
	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: {
			dealerName: data.dealerName,
			location: data.location
		},
		url: config.GET_SCHEMECODE,
	};

	try {
		const apiResponse = await axios(requestOption)
		return genericFetch(apiResponse);

	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}

export async function getSchemeDetails(token, data) {

	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: {
			dealerName: data.dealerName,
			location: data.location,
			schemeCode: data.schemeCode,
			applicantUniqueId: data.applicantUniqueId
		},
		url: config.GET_SCHEMEDetails,
	};

	try {
		const apiResponse = await axios(requestOption)
		return genericFetch(apiResponse);

	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}

export async function loanVehicleBrand(token, leadCode, vehicleType) {
	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: {
			lead_code: leadCode,
			vehicletype: vehicleType
		},
		url: config.LOAN_VEHICLEBRAND,
	};

	try {
		const apiResponse = await axios(requestOption)
		return genericFetch(apiResponse);

	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}

export async function loanVehicleModel(token, leadCode, vehicleBrand, vehicleType) {

	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		url: config.LOAN_VEHICLEMODEL,
		data: {
			lead_code: leadCode,
			vehiclebrand: vehicleBrand,
			vehicletype: vehicleType,
		}
	};

	try {
		const apiResponse = await axios(requestOption)
		return genericFetch(apiResponse);

	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}

export async function loanVehicleSubModel(token, leadCode, model, vehicleBrand, vehicleType) {

	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		url: config.LOAN_VEHICLESUBMODEL,
		data: {
			lead_code: leadCode,
			model: model,
			vehiclebrand: vehicleBrand,
			vehicletype: vehicleType,
		}
	};
	try {
		const apiResponse = await axios(requestOption)
		return genericFetch(apiResponse);

	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}

export async function loanMaximumAmount(token, leadCode, submodel, vehicletype, vehiclebrand, model, location, exShowroom, insurance) {

	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		url: config.LOAN_MAXIMUM_AMOUNT,
		data: {
			lead_code: leadCode,
			submodel: submodel,
			vehicletype: vehicletype,
			vehiclebrand: vehiclebrand,
			model: model,
			location: location,
			exShowroom: exShowroom,
			insurance: insurance
		}
	};
	try {
		const apiResponse = await axios(requestOption)
		return genericFetch(apiResponse);

	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}
export async function loanDealer(token, data) {
	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: {
			branchName: data.branch,
			employeeId: data.employeeId,
			brand: data.brand
		},
		url: config.DEALER_URL,
	};
	console.log('rrrrrrrrrr',requestOption);
	try {
		const apiResponse = await axios(requestOption)
		return apiResponse;
	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}

export async function loanSubDealer(token, data) {
	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: {
			branchName: data.branch,
			employeeId: data.employeeId

		},
		url: config.DEALER_URL,
	};
	try {
		const apiResponse = await axios(requestOption)
		return apiResponse;
	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}

export async function getApprovedLoanAmountApi(token, data) {
	const data1 = {
		emi: data.emi,
		isOpdCoverage: data.isOpdCoverage == 'Yes'? true: false,
		opdCoverage: data.opdCoverage,
		isOpdAddedInLoan: data.isOpdAddedInLoan == 'Yes'? true : false,
		// entry_dt: data.entry_dt,
		pfAmountTypeMaster: data.pfAmountTypeMaster,
		nachChargesMaster: data.nachChargesMaster,
		stampDutyMaster: data.stampDutyMaster,
		pfAmountMaster: data.pfAmountMaster,
		tenure_requested: data.valuetR,
		otherCharges: data.otherCharges,
		processingFees: data.processingFees,
		rateOfInterest: data.rateOfInterest,
		brand_nm: data.loanVehicleBrand,
		isPremiumamount: data.isPremiumamount == 'Yes' ? true : false,
		applicant_uniqueid: data.applicantUniqueId,
		model: data.loanVehicleModel,
		id: data.id,
		//insuranceAmount: data.insuranceAmount,
		startDate: data.startDate,
		endDate: data.endDate,
		schemeCode: data.schemeCode,
		schemeName: data.schemeName,
		ltvPercentage: data.ltv,
		pfAmountType: data.pfAmountType,
		pfAmountMaster: data.pfAmountMaster,
		bureauCharges: data.bureauCharges,
		submodel: data.loanVehicleSubModel,
		vehicle_type: data.loanVehicleDetails,
		isguarantor: data.isguarantor,
		lead_code: data.leadCode,
		amt_requested: data.valueaR,
		dealer_name: data.selectedDealer,
		islifeInsurance: data.islifeInsurance,
		ismainapplicant: data.ismainapplicant,
		leadCode: data.leadCode,
		dealerCharges: data.dealerCharges,
		maxamt: data.maxAmt,
		dealerSubvention: data.dealerSubvention,
		adminFees: data.adminFees,
		exShowroom: data.exShowroomPrice,
		insurance: data.insurance,
		nachCharges: data.nachCharges,
		preEmi: data.preEmi,
		convenienceCharges: data.convenienceCharges,
		pddCharges: data.pddCharges,
		dealerPayout: data.dealerPayout,
		dealerPayouttype: data.dealerPayouttype,
		stampDuty: data.stampDuty,
		amountSelected: data.amountSelected
	}
	if (data.subDealerName) {
		data1['subDealerName'] = data.subDealerName
	}
	if (data.islifeInsurance) {
		//("*******const", data.islifeInsurance);
		data1['premiumAmount'] = data.premiumAmount,
			data1['name'] = data.name,
			data1['address'] = data.address,
			data1['relationType'] = data.relationType,
			data1['dateOfBirth'] = data.dateOfBirth
	}
	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: data1,
		url: config.UPDATE_LOAN_INFO,
	};
	try {
		const apiResponse = await axios(requestOption)
		return genericFetch(apiResponse);

	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}

export async function saveUpdateLoanInfo(token, data) {
	const data1 = {
		emi: data.emi,
		isOpdCoverage: data.isOpdCoverage == 'Yes' ? true: false,
		opdCoverage: data.opdCoverage,
		isOpdAddedInLoan: data.isOpdAddedInLoan == 'Yes'? true : false,
		pfAmountTypeMaster: data.pfAmountTypeMaster,
		nachChargesMaster: data.nachChargesMaster,
		stampDutyMaster: data.stampDutyMaster,
		pfAmountMaster: data.pfAmountMaster,
		tenure_requested: data.valuetR,
		otherCharges: data.otherCharges,
		processingFees: data.processingFees,
		rateOfInterest: data.rateOfInterest,
		brand_nm: data.loanVehicleBrand,
		isPremiumamount: data.isPremiumamount == 'Yes' ? true : false,
		applicant_uniqueid: data.applicantUniqueId,
		model: data.loanVehicleModel,
		id: data.id,
		startDate: data.startDate,
		endDate: data.endDate,
		schemeCode: data.schemeCode,
		schemeName: data.schemeName,
		ltvPercentage: data.ltv,
		pfAmountType: data.pfAmountType,
		pfAmountMaster: data.pfAmountMaster,
		bureauCharges: data.bureauCharges,
		submodel: data.loanVehicleSubModel,
		vehicle_type: data.loanVehicleDetails,
		isguarantor: data.isguarantor,
		lead_code: data.leadCode,
		amt_requested: data.valueaR,
		ltvGridPercentage: data.ltvGridPercentage,
		ltvGridId: data.ltvGridId,
		ltvGridRule: data.ltvGridRule,
		dealer_name: data.selectedDealer,
		islifeInsurance: data.islifeInsurance,
		ismainapplicant: data.ismainapplicant,
		leadCode: data.leadCode,
		dealerCharges: data.dealerCharges,
		maxamt: data.maxAmt,
		dealerSubvention: data.dealerSubvention,
		adminFees: data.adminFees,
		exShowroom: data.exShowroomPrice,
		insurance: data.insurance,
		nachCharges: data.nachCharges,
		preEmi: data.preEmi,
		convenienceCharges: data.convenienceCharges,
		pddCharges: data.pddCharges,
		dealerPayout: data.dealerPayout,
		dealerPayouttype: data.dealerPayouttype,
		stampDuty: data.stampDuty,
		amountSelected: data.amountSelected
	}
	if (data.subDealerName) {
		data1['subDealerName'] = data.subDealerName
	}
	if (data.islifeInsurance) {
		//("*******const", data.islifeInsurance);
		data1['premiumAmount'] = data.premiumAmount,
		data1['name'] = data.name,
		data1['address'] = data.address,
		data1['relationType'] = data.relationType,
		data1['dateOfBirth'] = data.dateOfBirth
	}
	const requestOption = {
		method: 'POST',

		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		data: data1,
		url: config.SAVE_UPDATE_LOAN_INFO,
	};
	console.log("saveUpdateLoanInfo",JSON.stringify(requestOption, null,4));
	try {
		const apiResponse = await axios(requestOption)
		return genericFetch(apiResponse);

	} catch (error) {
		let obj = { data: { error: true, message: error } }
		return genericFetch(obj);
	};
}