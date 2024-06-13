import dbService from '@/appwrite/db';
import { Container, Postform } from '@/components'
import { useToast } from '@/components/ui/use-toast';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const {toast}=useToast();


  useEffect(() => {
    (async () => {
      try {
        const data = await dbService.getPost(slug);
        if (data) setPost(data);
        else navigate("/404");
      } catch (error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description:
            error?.message ?? "There was a problem with your request.",
          variant: "destructive",
        });
        navigate("/404");
      } 
    })();
  }, [slug, navigate]);

  return (
    <Container className='pb-18'>
      <Postform post={post}/>
    </Container>
  )
}

export default EditPost