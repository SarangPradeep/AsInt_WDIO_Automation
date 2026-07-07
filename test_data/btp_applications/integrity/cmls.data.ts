export const cmlsTestData = {
	searchTerms: {
		equipment: 'Automation CML Equipment [DND]',
		functionalLocation: 'Automation Functional Location [DND]',
	},
	cmlDetails: {
		descriptionPrefix: 'Automation CML Description',
		equipmentTemplate: 'Cathodic Protection Measurements',
		functionalLocationTemplate: 'IDMS_PIPE',
		cmlRowTemplate: 'UT Pipe',
	},
	funLocBackground: {
		selectedTmin: 'Calculated (Pressure)',
		coefficient: '0.4',
	},
	funLocPressureTmin: {
		internalDesignGagePressure: '10',
	},
} as const;
