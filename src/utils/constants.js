const baseUrl = 'http://localhost:8080';

const loginEndpoint = `/api/auth/login`;

const registerEndpoint = `/api/auth/register`;

const profileEndpoint = `/api/user/me`;

const profileAvatarEndpoint = `/api/user/avatar`;

const academiesEndpoint = `/api/shop/all`;

const followAcademyEndpoint = (id) => `/api/shop/follow/${id}`;

const unfollowAcademyEndpoint = (id) => `/api/shop/unfollow/${id}`;

const academyThumbnailEndpoint = `/api/shop/thumbnail`;

const editProfileEndpoint = `/api/user/`;

const editCredentialsEndpoint = `/api/user/credentials`;

const editAvatarEdnpoint = `/api/user/avatar`;

const createAcademyEndpoint = `/api/shop/create`;

const getAcademyEndpoint = (id) => `/api/shop/${id}`;

const editThumbnailEndpoint = (id) => `/api/shop/change/thumbnail/${id}`;

const editAcademyEndpoint = `/api/shop/update`;

const createMaterialEdnpoint = `/api/material/create`;

const uploadMaterialEndpoint = (id) => `/api/material/upload/${id}`;

const uploadMaterialThumbnailEndpoint = (id) => `/api/material/thumbnail/${id}`;

const allMaterialsEndpoint = `/api/material/all`;

const getMaterialEndpoint = (id) => `/api/material/retrieve/${id}`;

const materialThumbnailEndpoint = (id) => `/api/material/thumbnail/${id}`;

const validateTokenEndpoint = `/api/auth/verify`;

const materialStreamEndpoint = (id) => `/api/material/stream/${id}`;

export {
    loginEndpoint, 
    registerEndpoint, 
    profileEndpoint, 
    profileAvatarEndpoint, 
    academiesEndpoint,
    followAcademyEndpoint,
    unfollowAcademyEndpoint,
    academyThumbnailEndpoint,
    editProfileEndpoint,
    editCredentialsEndpoint,
    editAvatarEdnpoint,
    createAcademyEndpoint,
    getAcademyEndpoint,
    editThumbnailEndpoint,
    editAcademyEndpoint,
    createMaterialEdnpoint,
    uploadMaterialEndpoint,
    uploadMaterialThumbnailEndpoint,
    getMaterialEndpoint,
    allMaterialsEndpoint,
    materialThumbnailEndpoint,
    validateTokenEndpoint,
    materialStreamEndpoint
};