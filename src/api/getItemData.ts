import axios from 'axios';

export interface ItemType {
    created_at:     number;
    key:            string;
    expires_at:     number;
    download_count: number;
    count:          number;
    size:           number;
    summary:        string;
    thumbnailUrl:   string;
    files:          File[];
    sent?:          Sent;
}

export interface File {
    key:          string;
    thumbnailUrl: string;
    name:         string;
    size:         number;
}

export interface Sent {
    subject: string;
    content: string;
    emails:  string[];
}

export const getItemData = async (): Promise<ItemType[]> => {
    const { data } = await axios.get('https://romantic-hopper-546d5e.netlify.app/data/itemInfoList.json');
    
    return data;
}

export const getTagetItemData = async (queryID: string | null): Promise<ItemType> => {
    const { data: { message } } = await axios.get(`https://romantic-hopper-546d5e.netlify.app/data/detail${queryID}.json`);

    return message;
}