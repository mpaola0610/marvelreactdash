let token = `2b790704b3c221e3e7a2a76198f6cfdc41272b0c9bda00aa`

export const server_calls = {
    get:async () => {
        const response = await fetch(`https://marvel-collection-sf2.herokuapp.com/api/marvels`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()

    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://marvel-collection-sf2.herokuapp.com/api/marvels/`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://marvel-collection-sf2.herokuapp.com/api/marvels${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },
    delete: async(id:string) => {
        const response = await fetch(`https://marvel-collection-sf2.herokuapp.com/api/marvels${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
    }
}