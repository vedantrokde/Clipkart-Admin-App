export const createCategoryList = (categories, options = []) => {
    for (let cat of categories) {
        options.push({ value: cat._id, name: cat.name, parentId: cat.parentId, type: cat.type });
        if (cat.children && cat.children.length > 0) createCategoryList(cat.children, options)
    }
    return options;
};

// export default createCategoryList;