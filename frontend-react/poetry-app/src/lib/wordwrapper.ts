import axios, { AxiosError, AxiosResponse } from 'axios';

const articles =['the','a','an']

const pronouns =['I','me','you','he','she','it','him','her','we','us','they','them']

const syncategoremes = ['in', 'to', 'that', 'is', 'it', 'with', 'on', 'I', 'by', 'he',
'and', 'as', 'from', 'at', 'you', 'they', 'are', 'which', 'we', 'be', 'there', 'she',
 'this', 'who', 'also', 'all', 'about', 'so', 'were', 'have', 'only', 'what', 'more',
'into', 'him', 'them', 'but', 'me', 'then', 'am', 'most', 'when', 'between', 'many', 'like', 
'very', 'after', 'even', 'now', 'over', 'through', 'how', 'used', 'however', 'much', 
'her', 'do', 'well', 'a', 'has', 'us', 'the', 'where', 'during', 'here', 'out', 'both',
'without', 'too', 'before', 'not', 'often', 'no', 'those', 'against', 'thus', 'again', 
'upon', 'less', 'need', 'some', 'among', 'always', 'up', 'several', 'around', 'himself', 
'therefore', 'or', 'once', 'above', 'away', 'down', 'these', 'almost', 'usually', 'did', 
'least', 'itself', 'because', 'rather', 'together', 'already', 'why', 'themselves', 
'whether', 'along', 'perhaps', 'ever', 'either', 'sometimes', 'since', 'cause', 'soon', 
'though', 'needs', 'whose', 'outside', 'behind', 'below', 'until', 'may', 'off', 'instead', 
'whom', 'does', 'any', 'towards', 'except', 'will', 'myself', 'inside', 'herself', 'neither', 
'forward', 'none', 'despite', 'ago', 'while', 'yourself', 'his', 'mine', 'onto', 'ourselves', 
'ahead', 'nor', 'ought', 'an', 'beside', 'beneath', 'could', 'till', 'would', 'seldom', 
'although', 'yours', 'every', 'never', 'my', 'ours', 'our', 'hers', 'should', 'must', 'might', 
'your', 'theirs', 'their', 'its', 'shall', 'backwards', 'yourselves', 'unless', 'inspite', 
"don't", "oughtn't", "can't", 'cannot', "didn't", "mayn't", "won't", "couldn't", "isn't", 
"wasn't", "wouldn't", "doesn't", "aren't", "shouldn't", "haven't", "hadn't", "weren't", 
"usen't", "hasn't", "mustn't", "usedn't", "shan't","needn't","mightn't","'cos"]

const commonverbs = ['seems', 'playing', 'felt', 'run', 'spending', 'fall', 'plays', 
'speaking', 'need', 'thinks', 'buys', 'offering', 'explains', 'remembered', 'opening', 
'try', 'find', 'paid', 'leaves', 'leaving', 'tell', 'letting', 'came', 'holding', 'lived', 
'bringing', 'carried', 'became', 'sleeps', 'fills', 'seeing', 'give', 'seeming', 'listen', 
'promising', 'following', 'talk', 'putting', 'began', 'brings', 'talking', 'offered', 
'stops', 'did', 'called', 'went', 'fly', 'show', 'changes', 'happened', 'gives', 'lose', 
'mean', 'starting', 'stopped', 'fill', 'shown', 'begins', 'promises', 'keep', 'lets', 
'making', 'carry', 'let', 'believes', 'filling', 'borrowing', 'held', 'knows', 'looks', 
'learns', 'thinking', 'listened', 'coming', 'told', 'asking', 'look', 'fallen', 'listening', 
'suggests', 'opened', 'deciding', 'thought', 'carrying', 'moved', 'eating', 'asked', 'has', 
'knew', 'sit', 'sets', 'got', 'explained', 'setting', 'get', 'begun', 'reads', 'looked', 
'allows', 'see', 'saying', 'doing', 'bought', 'eats', 'gets', 'closed', 'becomes', 'saw', 
'is', 'trying', 'move', 'sending', 'tries', 'broken', 'open', 'live', 'found', 'stood', 'hurts', 
'help', 'eaten', 'keeps', 'cutting', 'traveling', 'paying', 'stopping', 'finishing', 'flying', 
'going', 'speak', 'broke', 'sees', 'put', 'spend', 'offers', 'opens', 'falls', 'calling', 
'living', 'must', 'talked', 'should', 'being', 'believe', 'tried', 'spoken', 'were', 'be', 
'brought', 'sent', 'have', 'started', 'suggest', 'believing', 'left', 'follows', 'come', 
'explain', 'kills', 'takes', 'offer', 'tells', 'fell', 'think', 'breaking', 'travel', 'looking', 
'explaining', 'pays', 'feeling', 'hurt', 'seen', 'slept', 'running', 'change', 'learn', 'seemed', 
'lives', 'send', 'begin', 'sits', 'buy', 'changed', 'kill', 'took', 'telling', 'flew', 'holds', 
'becoming', 'shall', 'been', 'sends', 'could', 'does', 'standing', 'killed', 'leave', 'learned', 
'hurting', 'seem', 'meant', 'met', 'liking', 'sleeping', 'sat', 'stand', 'call', 'happen', 'closes', 
'taken', 'ask', 'asks', 'feels', 'needed', 'finds', 'borrowed', 'learning', 'eat', 'helped', 'shows', 
'needing', 'spoke', 'believed', 'showed', 'moves', 'had', 'made', 'reading', 'decides', 'cuts', 'goes', 
'go', 'needs', 'talks', 'makes', 'losing', 'given', 'remembers', 'changing', 'likes', 'gotten', 'break', 
'flown', 'bring', 'kept', 'known', 'follow', 'says', 'borrows', 'followed', 'decided', 'taking', 'say', 
'finish', 'beginning', 'having', 'promise', 'spent', 'adds', 'heard', 'take', 'remember', 'knowing', 
'start', 'play', 'means', 'know', 'breaks', 'meets', 'puts', 'finishes', 'make', 'remembering', 'happens', 
'loses', 'pay', 'listens', 'speaks', 'helping', 'allowed', 'ran', 'lost', 'starts', 'sleep', 'travelled', 
'allowing', 'suggested', 'done', 'finished', 'hear', 'happening', 'buying', 'filled', 'finding', 'borrow', 
'carries', 'cut', 'giving', 'feel', 'killing', 'become', 'close', 'do', 'meaning', 'stands', 'meeting', 
'keeping', 'getting', 'decide', 'may', 'gone', 'ate', 'helps', 'calls', 'showing', 'hears', 'flies', 'was', 
'set', 'played', 'added', 'comes', 'travels', 'hearing', 'adding', 'sitting', 'runs', 'promised', 'meet', 
'stop', 'said', 'read', 'spends', 'falling', 'liked', 'can', 'like', 'learnt', 'moving', 'gave', 'suggesting', 
'closing', 'hold', 'allow', 'add']

const randombase = 'https://random-word-api.herokuapp.com'
const musebase = 'https://api.datamuse.com'

const apiClientNoAuth = (base:string) => axios.create({
    baseURL: base
});

type APIResponse<T> = {
    error: string | AxiosError | undefined;
    data: T | undefined
}

async function getRandomWord(length:number):Promise<APIResponse<string[]>>{
    let error;
    let data;

    try {
        const resp: AxiosResponse<string[]> = await apiClientNoAuth(randombase).get(`word?length=${length.toString()}`)
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

type Metadata = {
    word:string,
    score:number,
    tags:string[]
}

async function getMetadata(word:string):Promise<APIResponse<Metadata[]|undefined>>{
    let error;
    let data;

    try{
        const resp: AxiosResponse<Metadata[]> = await apiClientNoAuth(musebase).get(`words?sp=${word}&qe=sp&md=pf&max=1`)
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

async function checkFrequency(word:string):Promise<number | undefined>{
        const resp = await getMetadata(word)
        if (resp.error){
            console.log('error')
        }else{
            return resp.data?parseFloat(resp.data[0].tags.slice(-1)[0].slice(2)):undefined
        }
    }

type rawWord = {
    word:string,
    score:number
}




// async function getLikeMeanings(word:string):Promise<APIResponse<rawWord[]|undefined>>{
//     let error;
//     let data;
//     try{
//         const resp: AxiosResponse<rawWord[]> = await apiClientNoAuth(musebase).get(`words?ml=${word}`)
//         data = resp.data
//     } catch(err){
//         if (axios.isAxiosError(err)){
//             error = err.message
//         }else{
//             error = 'Something went wrong'
//         }
        
//     }
//     return{
//         error,
//         data
//     }
// }

// async function getSynonyms(word:string):Promise<APIResponse<rawWord[]|undefined>>{
//     let error;
//     let data;
//     try{
//         const resp: AxiosResponse<rawWord[]> = await apiClientNoAuth(musebase).get(`words?rel_syn=${word}`)
//         data = resp.data
//     } catch(err){
//         if (axios.isAxiosError(err)){
//             error = err.message
//         }else{
//             error = 'Something went wrong'
//         }
        
//     }
//     return{
//         error,
//         data
//     }
// }

// async function getTriggers(word:string):Promise<APIResponse<rawWord[]|undefined>>{
//     let error;
//     let data;
//     try{
//         const resp: AxiosResponse<rawWord[]> = await apiClientNoAuth(musebase).get(`words?rel_trg=${word}`)
//         data = resp.data
//     } catch(err){
//         if (axios.isAxiosError(err)){
//             error = err.message
//         }else{
//             error = 'Something went wrong'
//         }
        
//     }
//     return{
//         error,
//         data
//     }
// }

// async function getAntonyms(word:string):Promise<APIResponse<rawWord[]|undefined>>{
//     let error;
//     let data;
//     try{
//         const resp: AxiosResponse<rawWord[]> = await apiClientNoAuth(musebase).get(`words?rel_ant=${word}`)
//         data = resp.data
//     } catch(err){
//         if (axios.isAxiosError(err)){
//             error = err.message
//         }else{
//             error = 'Something went wrong'
//         }
        
//     }
//     return{
//         error,
//         data
//     }
// }

// async function getRhymes(word:string):Promise<APIResponse<rawWord[]|undefined>>{
//     let error;
//     let data;
//     try{
//         const resp: AxiosResponse<rawWord[]> = await apiClientNoAuth(musebase).get(`words?rel_rhy=${word}`)
//         data = resp.data
//     } catch(err){
//         if (axios.isAxiosError(err)){
//             error = err.message
//         }else{
//             error = 'Something went wrong'
//         }
        
//     }
//     return{
//         error,
//         data
//     }
// }

// async function getCategory(word:string):Promise<APIResponse<rawWord[]|undefined>>{
//     let error;
//     let data;
//     try{
//         const resp: AxiosResponse<rawWord[]> = await apiClientNoAuth(musebase).get(`words?rel_spc=${word}`)
//         data = resp.data
//     } catch(err){
//         if (axios.isAxiosError(err)){
//             error = err.message
//         }else{
//             error = 'Something went wrong'
//         }
        
//     }
//     return{
//         error,
//         data
//     }
// }


// async function getTopicalRhymes(word:string,topic:string):Promise<APIResponse<rawWord[]|undefined>>{
//     let error;
//     let data;
//     try{
//         const resp: AxiosResponse<rawWord[]> = await apiClientNoAuth(musebase).get(`words?rel_rhy=${word}&topics=${topic}`)
//         data = resp.data
//     } catch(err){
//         if (axios.isAxiosError(err)){
//             error = err.message
//         }else{
//             error = 'Something went wrong'
//         }
        
//     }
//     return{
//         error,
//         data
//     }
// }

async function getTopicalTriggers(word:string,topic:string):Promise<APIResponse<rawWord[]|undefined>>{
    let error;
    let data;
    try{
        const resp: AxiosResponse<rawWord[]> = await apiClientNoAuth(musebase).get(`words?rel_trg=${word}&topics=${topic}`)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.message
        }else{
            error = 'Something went wrong'
        }
        
    }
    return{
        error,
        data
    }
}

async function getTopicalLikeMeanings(word:string,topic:string):Promise<APIResponse<rawWord[]|undefined>>{
    let error;
    let data;
    try{
        const resp: AxiosResponse<rawWord[]> = await apiClientNoAuth(musebase).get(`words?ml=${word}&topics=${topic}`)
        data = resp.data
    } catch(err){
        if (axios.isAxiosError(err)){
            error = err.message
        }else{
            error = 'Something went wrong'
        }
        
    }
    return{
        error,
        data
    }
}

//first we get ~half of the words from a hardcoded list of function words, common verbs, and articles
function getFunctionWords(count:number){
    let words = []
    while(words.length<count){
        let i = Math.floor(Math.random()**2*200)
        if(syncategoremes[i]){
            words.push(syncategoremes[i])
        }
    }
    return words
}

function getCommonVerbs(count:number){
    let words = []
    while(words.length<count){
        let i = Math.floor(Math.random()*350)
        if(commonverbs[i]){
            words.push(commonverbs[i])
        }
    }
    return words
}

function getArticles(count:number){
    let words = []
    while(words.length<count){
        let i = Math.floor(Math.random()**2*3)
        if (articles[i]){
            words.push(articles[i])
        }
    }
    return words
}

function getPronouns(count:number){
    let words = []
    while(words.length<count){
        let i = Math.floor(Math.random()*12)
        if (pronouns[i]){
            words.push(pronouns[i])
        }
    }
    return words
}
//then we try to seed the other ~half from a random word from the random-word-api, provided its frequency is reasonable

async function chooseRandomSeed():Promise<string|undefined>{
    let l = Math.floor(Math.random()*3)+4
    const resp = await getRandomWord(l)
        if (resp.error){
            console.log('error')
        }else{
            const respo = await checkFrequency(resp.data![0])
            if (respo){
                if (respo<1){
                    return await chooseRandomSeed()
                }else{
                    return resp.data![0]
                }
            }else{
                return await chooseRandomSeed()         
            }
        }
    }




//we form a vague semantic cluster around this chosen random word to provide the other ~half of the words

async function getPoemWords():Promise<string[]|undefined>{
    let a = Math.floor(Math.random()*2)+2
    let f = Math.floor(Math.random()*7)+7
    let v = Math.floor(Math.random()*4)+4
    let p = Math.floor(Math.random()*2)+2
    let c = (Math.floor(Math.random()*(f+v+a+p)+(1.5*(f+v+a+p))))
    let l = getFunctionWords(f).concat(getCommonVerbs(v),getArticles(a),getPronouns(p))
    const resp = await chooseRandomSeed()
        if (!resp){
            console.log('error')
        }else{
            l.push(resp)
            const respo = await chooseRandomSeed()
            if (!respo){
                console.log('error')
            }else{
                l.push(respo)
                const response = await getTopicalTriggers(resp,respo)
                if (!response){
                    console.log('error')
                }else{
                    let n = c - l.length
                    let m = Math.floor(Math.random()*n)
                    let k = 0
                    while(k < m){
                        let i = Math.floor(Math.random()*response.data!.length)
                        if(!l.includes(response.data![i].word)){
                            l.push(response.data![i].word)
                        }
                        k ++
                    }
                const response2 = await getTopicalLikeMeanings(respo,resp)
                if (!response2){
                    console.log('error')
                }else{
                    let d = c-l.length
                    let j = 0
                    while(j<d){
                        let i = Math.floor(Math.random()*response2.data!.length)
                        if(!l.includes(response2.data![i].word)){
                            l.push(response2.data![i].word)
                        }
                        j++
                    }
                }
                }}
    return l.sort(() => 0.5 - Math.random())
}}





export {
    getPoemWords
}