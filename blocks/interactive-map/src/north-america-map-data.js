/**
 * Map data for US states and Canadian provinces/territories
 * Format: { 'SVG-ID': { code, name, country, slug } }
 */
export const MAP_DATA = {
	// US States
	'US-AL': { code: 'AL', name: 'Alabama', country: 'US', slug: 'alabama' },
	'US-AK': { code: 'AK', name: 'Alaska', country: 'US', slug: 'alaska' },
	'US-AZ': { code: 'AZ', name: 'Arizona', country: 'US', slug: 'arizona' },
	'US-AR': { code: 'AR', name: 'Arkansas', country: 'US', slug: 'arkansas' },
	'US-CA': { code: 'CA', name: 'California', country: 'US', slug: 'california' },
	'US-CO': { code: 'CO', name: 'Colorado', country: 'US', slug: 'colorado' },
	'US-CT': { code: 'CT', name: 'Connecticut', country: 'US', slug: 'connecticut' },
	'US-DE': { code: 'DE', name: 'Delaware', country: 'US', slug: 'delaware' },
	'US-FL': { code: 'FL', name: 'Florida', country: 'US', slug: 'florida' },
	'US-GA': { code: 'GA', name: 'Georgia', country: 'US', slug: 'georgia' },
	'US-HI': { code: 'HI', name: 'Hawaii', country: 'US', slug: 'hawaii' },
	'US-ID': { code: 'ID', name: 'Idaho', country: 'US', slug: 'idaho' },
	'US-IL': { code: 'IL', name: 'Illinois', country: 'US', slug: 'illinois' },
	'US-IN': { code: 'IN', name: 'Indiana', country: 'US', slug: 'indiana' },
	'US-IA': { code: 'IA', name: 'Iowa', country: 'US', slug: 'iowa' },
	'US-KS': { code: 'KS', name: 'Kansas', country: 'US', slug: 'kansas' },
	'US-KY': { code: 'KY', name: 'Kentucky', country: 'US', slug: 'kentucky' },
	'US-LA': { code: 'LA', name: 'Louisiana', country: 'US', slug: 'louisiana' },
	'US-ME': { code: 'ME', name: 'Maine', country: 'US', slug: 'maine' },
	'US-MD': { code: 'MD', name: 'Maryland', country: 'US', slug: 'maryland' },
	'US-MA': { code: 'MA', name: 'Massachusetts', country: 'US', slug: 'massachusetts' },
	'US-MI': { code: 'MI', name: 'Michigan', country: 'US', slug: 'michigan' },
	'US-MN': { code: 'MN', name: 'Minnesota', country: 'US', slug: 'minnesota' },
	'US-MS': { code: 'MS', name: 'Mississippi', country: 'US', slug: 'mississippi' },
	'US-MO': { code: 'MO', name: 'Missouri', country: 'US', slug: 'missouri' },
	'US-MT': { code: 'MT', name: 'Montana', country: 'US', slug: 'montana' },
	'US-NE': { code: 'NE', name: 'Nebraska', country: 'US', slug: 'nebraska' },
	'US-NV': { code: 'NV', name: 'Nevada', country: 'US', slug: 'nevada' },
	'US-NH': { code: 'NH', name: 'New Hampshire', country: 'US', slug: 'new-hampshire' },
	'US-NJ': { code: 'NJ', name: 'New Jersey', country: 'US', slug: 'new-jersey' },
	'US-NM': { code: 'NM', name: 'New Mexico', country: 'US', slug: 'new-mexico' },
	'US-NY': { code: 'NY', name: 'New York', country: 'US', slug: 'new-york' },
	'US-NC': { code: 'NC', name: 'North Carolina', country: 'US', slug: 'north-carolina' },
	'US-ND': { code: 'ND', name: 'North Dakota', country: 'US', slug: 'north-dakota' },
	'US-OH': { code: 'OH', name: 'Ohio', country: 'US', slug: 'ohio' },
	'US-OK': { code: 'OK', name: 'Oklahoma', country: 'US', slug: 'oklahoma' },
	'US-OR': { code: 'OR', name: 'Oregon', country: 'US', slug: 'oregon' },
	'US-PA': { code: 'PA', name: 'Pennsylvania', country: 'US', slug: 'pennsylvania' },
	'US-RI': { code: 'RI', name: 'Rhode Island', country: 'US', slug: 'rhode-island' },
	'US-SC': { code: 'SC', name: 'South Carolina', country: 'US', slug: 'south-carolina' },
	'US-SD': { code: 'SD', name: 'South Dakota', country: 'US', slug: 'south-dakota' },
	'US-TN': { code: 'TN', name: 'Tennessee', country: 'US', slug: 'tennessee' },
	'US-TX': { code: 'TX', name: 'Texas', country: 'US', slug: 'texas' },
	'US-UT': { code: 'UT', name: 'Utah', country: 'US', slug: 'utah' },
	'US-VT': { code: 'VT', name: 'Vermont', country: 'US', slug: 'vermont' },
	'US-VA': { code: 'VA', name: 'Virginia', country: 'US', slug: 'virginia' },
	'US-WA': { code: 'WA', name: 'Washington', country: 'US', slug: 'washington' },
	'US-WV': { code: 'WV', name: 'West Virginia', country: 'US', slug: 'west-virginia' },
	'US-WI': { code: 'WI', name: 'Wisconsin', country: 'US', slug: 'wisconsin' },
	'US-WY': { code: 'WY', name: 'Wyoming', country: 'US', slug: 'wyoming' },

	// Canadian Provinces
	'CA-AB': { code: 'AB', name: 'Alberta', country: 'CA', slug: 'alberta' },
	'CA-BC': { code: 'BC', name: 'British Columbia', country: 'CA', slug: 'british-columbia' },
	'CA-MB': { code: 'MB', name: 'Manitoba', country: 'CA', slug: 'manitoba' },
	'CA-NB': { code: 'NB', name: 'New Brunswick', country: 'CA', slug: 'new-brunswick' },
	'CA-NL': { code: 'NL', name: 'Newfoundland and Labrador', country: 'CA', slug: 'newfoundland-and-labrador' },
	'CA-NS': { code: 'NS', name: 'Nova Scotia', country: 'CA', slug: 'nova-scotia' },
	'CA-ON': { code: 'ON', name: 'Ontario', country: 'CA', slug: 'ontario' },
	'CA-PE': { code: 'PE', name: 'Prince Edward Island', country: 'CA', slug: 'prince-edward-island' },
	'CA-QC': { code: 'QC', name: 'Quebec', country: 'CA', slug: 'quebec' },
	'CA-SK': { code: 'SK', name: 'Saskatchewan', country: 'CA', slug: 'saskatchewan' },

	// Canadian Territories
	'CA-NT': { code: 'NT', name: 'Northwest Territories', country: 'CA', slug: 'northwest-territories' },
	'CA-NU': { code: 'NU', name: 'Nunavut', country: 'CA', slug: 'nunavut' },
	'CA-YT': { code: 'YT', name: 'Yukon', country: 'CA', slug: 'yukon' }
};

/**
 * Get region data by SVG ID
 * @param {string} id - SVG element ID (e.g., 'US-CA', 'CA-ON')
 * @returns {Object|null} Region data or null if not found
 */
export function getRegionData(id) {
	return MAP_DATA[id] || null;
}

/**
 * Format URL based on webhook format setting
 * @param {Object} regionData - Region data object
 * @param {string} baseUrl - Base URL
 * @param {string} format - URL format type
 * @returns {string} Formatted URL
 */
export function formatWebhookUrl(regionData, baseUrl, format) {
	const { code, slug, country } = regionData;
	let path = '';

	switch (format) {
		case 'state-slug':
			path = slug;
			break;
		case 'country-state-slug':
			path = `${country.toLowerCase()}/${slug}`;
			break;
		case 'code':
			path = code;
			break;
		case 'country-code':
			path = `${country}:${code}`;
			break;
		default:
			path = slug;
	}

	// Ensure base URL ends with / if not empty
	const normalizedBase = baseUrl && !baseUrl.endsWith('/') ? `${baseUrl}/` : baseUrl;
	return `${normalizedBase}${path}`;
}
