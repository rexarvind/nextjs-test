import { FormEvent, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface NoteFormProps {
    _id?: String;
    title?: String;
    content?: String;
    isPublic?: Boolean;
}


export default function NoteForm(props: NoteFormProps){
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState<any>(props.title || '')
    const [content, setContent] = useState<any>(props.content || '')
    const [isPublic, setIsPublic] = useState<any>(props.isPublic || false)
    const [_id, setId] = useState(props._id || '')

    const router = useRouter();


    function save(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const data = {title: title, content: content, isPublic: isPublic};
        setLoading(true);
        if(_id.length){
            // update
            axios.put('/api/notes', {...data, _id: _id}).then(function(res){
                if(res.data.message){
                    toast(res.data.message, { pauseOnHover: true, });
                }
            }).catch(function(err){
                toast('An error occurred');
            }).finally(function(){
                setLoading(false);
            });
        } else {
            // create
            axios.post('/api/notes', data).then(function(res){
                if(res.data.items && res.data.items.length && res.data.items[0]._id ){
                    setId(res.data.items[0]._id.toString());
                }
                toast('Note Created');
            }).catch(function(err){
                toast('An error occurred');
            }).finally(function(){
                setLoading(false);
            });
        }
    }

    return (
        <form onSubmit={save} className="h-full flex flex-col">
            <div className="h-full flex flex-col">
                <div className="mb-2">
                    <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="block w-full border px-3 py-2 " />
                </div>
                <div className="mb-2 h-full">
                    <textarea rows={5} name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="Write something..." className="block w-full h-full border px-3 py-2"></textarea>
                </div>
                <div className="mb-2">
                    <div className="flex items-center gap-2">
                        <input id="note-create-public" type="checkbox" defaultChecked={isPublic} name="isPublic" onChange={() => setIsPublic((state:any) => !state)} />
                        <label htmlFor="note-create-public" className="select-none">Make it public</label>
                    </div>
                </div>
            </div>
            <div className="flex mt-auto">
                <button type="button" onClick={() => router.back() } className="w-6/12 px-2 py-2 font-semibold select-none bg-gray-400 text-white">Cancel</button>
                <button type="submit" className="w-6/12 px-2 py-2 font-semibold select-none bg-blue-500 text-white">Save</button>
            </div>
        </form>
    )
}
