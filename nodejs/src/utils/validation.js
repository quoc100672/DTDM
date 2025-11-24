module.exports = {
    validateProductData: (data) => {
        const errors = [];
        
        if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
            errors.push('Product name is required and must be a non-empty string.');
        }
        
        if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
            errors.push('Product price is required and must be a positive number.');
        }
        
        if (!data.description || typeof data.description !== 'string' || data.description.trim() === '') {
            errors.push('Product description is required and must be a non-empty string.');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }
};