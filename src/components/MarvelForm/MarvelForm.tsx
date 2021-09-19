import React from 'react';
import {useDispatch, useSelector, useStore } from 'react-redux';
import {useForm} from 'react-hook-form';
import {chooseName} from '../../redux/slices/rootSlice';
import { Input } from '../sharedComponents';
import { Button } from '@material-ui/core';
import { server_calls } from '../../api';
import { useGetData } from '../../custom-hooks';

interface MarvelFormProps{
    id?:string;
    data?: {}
}

interface MarvelState {
    name: string;

}

export const MarvelForm = ( props:MarvelFormProps) => {
    const dispatch =useDispatch();
    let{ marvelData, getData} = useGetData();
    const store = useStore();

    const name = useSelector<MarvelState>(state=> state.name )
    const {register, handleSubmit } = useForm({ })
    const onSubmit = async (data: any, event:any) => {
        console.log(props.id)

        if(props.id!){
            await server_calls.update(props.id!, data)
            console.log (`updated: ${data} ${props.id}`)
            window.location.reload()
            event.target.reset();

        }else {
            dispatch (chooseName(data.name))
            await server_calls.create(store.getState())
            window.location.reload();
        }
    }
    return(
        <div>
            <form onSubmit ={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="name">Character Name</label>
                <Input {...register('name')} name="name" placeholder='Name' />
            </div>
            
            <div>
                <label htmlFor="power">Power</label>
                <Input {...register('power')} name="power" placeholder="Power"/>
            </div>
            <div>
                <label htmlFor="flight_time">Flight Time</label>
                <Input {...register('flight_time')} name="flight_time" placeholder="Flight Time"/>
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <Input {...register('description')} name="description" placeholder="Description"/>
            </div>

            <div>
                <label htmlFor="height">Height</label>
                <Input {...register('height')} name="height" placeholder="Height"/>
            </div>
            <div>
                <label htmlFor="comic_appearances">Comics Appeared In</label>
                <Input {...register('comic_appearances')} name="comic_appearances" placeholder="Comic Appearances"/>
            </div>
            <div>
                <label htmlFor="max_speed"> Max Speed</label>
                <Input {...register('max_speed')} name="max_speed" placeholder="Max_Speed"/>
            </div>
            <div>
                <label htmlFor="weight">Weight</label>
                <Input {...register('weight')} name="weight" placeholder= "Weight"/>
            </div>
            <div>
                <label htmlFor="series">Series</label>
                <Input {...register('series')} name="series" placeholder= "series"/>
            </div>
            <Button type='submit'>Submit</Button>  
            </form>
        </div>
    )
}
