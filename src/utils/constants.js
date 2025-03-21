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
    editCredentialsEndpoint
};