import dbService from "@/appwrite/db";
import { Button, Container } from "@/components";
import { Loader2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { useToast } from "@/components/ui/use-toast";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting ,setDeleting]=useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const {toast}=useToast();

  const isAuthor = useMemo(() => {
    return post && userData ? post?.userId === userData?.$id : false;
  }, [post, userData]);

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
      } finally {
        setLoading(false);
      }
    })();
  }, [slug, navigate]);

  const deletePost=async()=>{
    setDeleting(true);
    try {
      const status=await dbService.deletePost(post.$id);
      if(status){
        await dbService.deleteFile(post.featureImage);
        toast({
          title: "Post Deleted",
          variant: "success",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description:error?.message ??"There was a problem with your request.",
        variant: "destructive",
      });
    }finally{
      setDeleting(false);
    }
  }

  if (loading) {
    <Container>
      <Loader2 className="animate-spin size-12" />
    </Container>;
  }


  return ( post? (
    <div className="p-10 flex items-center flex-col">
      <div className="rounded-xl md:w-2/3 ">
      <LazyLoadImage
        src={dbService.getFilePreview(post?.featureImage)}
        alt={post.title}
        effect="blur"
        height="auto"
      />
      </div>
      <div className="md:w-2/3 ">
        <h1 className="text-4xl  font-bold mt-4 ">{post.title}</h1>
        <div className="text-base text-wrap mt-4 browser-css">{parse(post.content)}</div>

        {isAuthor && (
      <div className="flex gap-5 justify-end py-4">
          <Link to={`/edit-post/${post.$id}`}>
            <Button className='md:w-24'>Edit</Button>
          </Link>
          <Button onClick={deletePost} disabled={deleting} className='md:w-40' variant="destructive">
          {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
                ) : (
                    "Delete-Post"
                )}
            </Button>
      </div>)}
      </div>


    </div>)
    
    :(<Container>
      <Loader2 className="animate-spin size-12" />
    </Container>)
  );
}

export default Post;
