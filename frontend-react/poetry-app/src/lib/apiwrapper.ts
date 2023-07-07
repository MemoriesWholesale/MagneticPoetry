import axios, { AxiosError, AxiosResponse } from 'axios';
import User from '../types/user';
import Poem from '../types/poem';
import PoemList from '../types/poemlist';
import Composition from '../types/composition';
import CompositionList from '../types/compositionlist';


const base:string = 'http://127.0.0.1:5000'
const userendpoint:string = '/user'
const poemsendpoint:string = '/poem'
const exploreendpoint:string = '/poem/explore'
const followendpoint:string = '/follow'
const unfollowendpoint:string = '/unfollow'
const compositionendpoint:string = '/composition'
const explorecompsendpoint:string = '/composition/explore'


const apiClientNoAuth = () => axios.create({
    baseURL: base
});

const apiClientBasic = (username:string,password:string)=>axios.create({
    baseURL: base,
    headers: {
        Authorization: "Basic " + btoa(username + ":" + password)
    }
})

const apiClientToken = (token:string) => axios.create({
    baseURL: base,
    headers: {
        Authorization: "Bearer " + token
    }
})

type APIResponse<T> = {
    error: string | AxiosError | undefined;
    data: T | undefined
}



async function getCompositions(token:string):Promise <APIResponse<CompositionList>>{
    let error;
    let data;

    try {
        const resp: AxiosResponse<CompositionList> = await apiClientToken(token).get(compositionendpoint)
        data = resp.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        }else{
            error = 'Something went wrong'
        }
        
    }
    return {
        error,
        data
    }
}

async function getUserCompositions(username:string,token:string):Promise<APIResponse<CompositionList>>{
    let error;
    let data;

    try {
        const resp: AxiosResponse<CompositionList> = await apiClientToken(token).get(compositionendpoint+'/'+username)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.message
        }else{
            error = 'Something went wrong'
        }
    }
        return {
            error,
            data
        }
    }

async function exploreCompositions(user_id:number|undefined):Promise<APIResponse<CompositionList>>{
    let error;
    let data;

    try {
        let url = user_id? explorecompsendpoint+`?user_id=${user_id}`:explorecompsendpoint
        const resp: AxiosResponse<CompositionList> = await apiClientNoAuth().get(url)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.message
        }else{
            error = 'Something went wrong'
        }
    }
        return {
            error,
            data
        }
    }


async function createComposition(composition:Composition,token:string):Promise<APIResponse<Composition>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Composition> = await apiClientToken(token).post(compositionendpoint,composition)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.message
        }else{
            error='Something went wrong'
        }
    }
    return {
        error,
        data
    }
}

async function editComposition(currentcomposition:Composition,newcomposition:Composition,token:string):Promise<APIResponse<Composition>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Composition> = await apiClientToken(token).put(compositionendpoint+'/'+currentcomposition.id!.toString(),newcomposition)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.message
        }else{
            error='Something went wrong'
        }
    }
    return {
        error,
        data
    }
}

async function deleteComposition(composition:Composition,token:string):Promise<APIResponse<Composition>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Composition> = await apiClientToken(token).delete(compositionendpoint+'/'+composition.id!.toString())
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.message
        }else{
            error='Something went wrong'
        }
    }
    return {
        error,
        data
    }
}



async function getPoems(token:string):Promise <APIResponse<PoemList>>{
    let error;
    let data;

    try {
        const resp: AxiosResponse<PoemList> = await apiClientToken(token).get(poemsendpoint)
        data = resp.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        }else{
            error = 'Something went wrong'
        }
        
    }
    return {
        error,
        data
    }
}

async function getUserPoems(username:string,token:string):Promise<APIResponse<PoemList>>{
    let error;
    let data;

    try {
        const resp: AxiosResponse<PoemList> = await apiClientToken(token).get(poemsendpoint+'/'+username)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.message
        }else{
            error = 'Something went wrong'
        }
    }
        return {
            error,
            data
        }
    }

    async function explore(user_id:number|undefined):Promise<APIResponse<PoemList>>{
        let error;
        let data;
    
        try {
            let url = user_id? exploreendpoint+`?user_id=${user_id}`:exploreendpoint
            const resp: AxiosResponse<PoemList> = await apiClientNoAuth().get(url)
            data = resp.data
        } catch(err){
            if (axios.isAxiosError(err)){
                error = err.message
            }else{
                error = 'Something went wrong'
            }
        }
            return {
                error,
                data
            }
        }


async function createPoem(poem:Poem,token:string):Promise<APIResponse<Poem>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Poem> = await apiClientToken(token).post(poemsendpoint,poem)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.message
        }else{
            error='Something went wrong'
        }
    }
    return {
        error,
        data
    }
}

async function editPoem(currentpoem:Poem,newpoem:Poem,token:string):Promise<APIResponse<Poem>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Poem> = await apiClientToken(token).put(poemsendpoint+'/'+currentpoem.id!.toString(),newpoem)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.message
        }else{
            error='Something went wrong'
        }
    }
    return {
        error,
        data
    }
}

async function deletePoem(poem:Poem,token:string):Promise<APIResponse<Poem>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Poem> = await apiClientToken(token).delete(poemsendpoint+'/'+poem.id!.toString())
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error=err.message
        }else{
            error='Something went wrong'
        }
    }
    return {
        error,
        data
    }
}



async function register(newUser:User):Promise<APIResponse<User>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<User> = await apiClientNoAuth().post(userendpoint,newUser)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        }else{
            error = 'Something went wrong'
        }
    }
    return{
        error,
        data
    }
}

async function login(username:string, password:string):Promise<APIResponse<User>>{
    let error;
    let data;
    try{
        const resp: AxiosResponse<User> = await apiClientBasic(username,password).get(userendpoint)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else{
            error = 'Something went wrong'
        }
    }
    return{
        error,
        data
    }
}

async function editUser(token:string,newUser:User):Promise<APIResponse<User>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<User> = await apiClientToken(token).put(userendpoint,newUser)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        }else{
            error = 'Something went wrong'
        }
    }
    return{
        error,
        data
    }
}

async function deleteUser(token:string):Promise<APIResponse<User>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<User> = await apiClientToken(token).delete(userendpoint)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        }else{
            error = 'Something went wrong'
        }
    }
    return{
        error,
        data
    }
}

async function follow(username:string,token:string):Promise<APIResponse<User>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<User> = await apiClientToken(token).post(followendpoint+'/'+username)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        }else{
            error = 'Something went wrong'
        }
    }
    return{
        error,
        data
    }
}

async function checkFollow(username:string,token:string):Promise<APIResponse<Boolean[]>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<Boolean[]> = await apiClientToken(token).get(followendpoint+'/'+username)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        }else{
            error = 'Something went wrong'
        }
    }
    return{
        error,
        data
    }
}


async function unfollow(username:string,token:string):Promise<APIResponse<User>>{
    let error;
    let data;
    try {
        const resp: AxiosResponse<User> = await apiClientToken(token).post(unfollowendpoint+'/'+username)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        }else{
            error = 'Something went wrong'
        }
    }
    return{
        error,
        data
    }
}



export {
    exploreCompositions,
    getCompositions,
    getUserCompositions,
    createComposition,
    editComposition,
    deleteComposition,
    explore,
    getPoems,
    getUserPoems,
    register,
    login,
    createPoem,
    editPoem,
    deletePoem,
    editUser,
    deleteUser,
    follow,
    unfollow,
    checkFollow
}