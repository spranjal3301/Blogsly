import dbService from '@/appwrite/db';
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useToast } from '../ui/use-toast';
import { Button, Input, RTE } from '..';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Loader2 } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function Postform({post=null}) {
    const {register,handleSubmit,watch,setValue,control,getValues}=useForm({
        defaultValues:{
            title:post?.title ?? "",
            content:post?.content ?? "",
            slug:post?.slug ?? "",
            status:post?.status ?? "active",
        }
    })
    const navigate=useNavigate();
    const userData=useSelector((state)=>state.auth.userData);
    const {toast}=useToast();
    const [isSubmitting,setIsSubmitting]=useState(false);

    const submit=async (data)=>{
        setIsSubmitting(true);
        try {
            if(post){
                //`update 
                const file=data.image[0] ? await dbService.uploadFile(data.image[0]) : null;
                          await dbService.deleteFile(post.featureImage);
                
                const dbPost=await dbService.updatePost(post.$id,{...data,
                    featureImage:file ? file.$id : undefined
                })
    
                if(dbPost){
                    toast({
                        title: "Post-Updated",
                        variant: "success",
                      });
                    navigate(`/post/${dbPost.$id}`);
                }
            }else{
                //`create
                const file=data.image[0] ? await dbService.uploadFile(data.image[0]) : null;
                if(file){
                    data.featureImage=file.$id;
                    const dbPost=await dbService.createPost({...data,userId:userData.$id})
                    toast({
                        title: "Post-Created",
                        variant: "success",
                      });
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        } 
        catch (error) 
        {
            // console.log("🚀 ~ submit ~ error:", error)   
            toast({
                title: "Uh oh! Something went wrong.",
                description: error?.message ?? "There was a problem with your request.",
                variant: "destructive",
              });
        }finally{
            setIsSubmitting(false);
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title),{shouldValidate:true})
            }

            return ()=>{
                subscription.unsubscribe();
            }
        })
    },[watch,slugTransform,setValue]);


  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap p-8">
        <div className="w-full">

            <div>
                <Label htmlFor="Title :">Title :</Label>
                <Input
                    id="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
            </div>

            <div>
                <Label htmlFor="Slug :">Slug :</Label>
                <Input
                    id="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    disabled={true}
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
            </div>

            <div>
                <Label htmlFor="Featured Image :">Featured Image :</Label>
                <Input
                    id="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-1/2 mb-4">
                        <LazyLoadImage
                            src={dbService.getFilePreview(post.featureImage)}
                            alt={post.title}
                            effect="blur"
                            className="rounded-lg"
                        />
                    </div>
                )}
            </div>
           
            <div>
                <Label htmlFor="Featured Image :">Status :</Label>
                <Select>
                <SelectTrigger className="" {...register("status", { required: true })}>
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="active">active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
                </Select>
            </div>
        </div>

        <div className="w-full mt-8 ">
            <RTE label="Content :" name="content" control={control} defaultValue={post?post?.content:''} />
            
            <div className='text-end mt-10'>
                <Button disabled={isSubmitting} type="submit"  className={`w-full md:w-44 ${post ? "bg-green-500" :''}`}>
                {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
                ) : (
                    post ? "Update" : "Submit"
                )}
                </Button>
            </div>
        </div>
    </form>
);
}
