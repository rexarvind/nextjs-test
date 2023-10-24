import { FormEvent, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

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
        <form onSubmit={save}>
            <div>
                <input type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full border" />
            </div>
            <div>
                <textarea rows={5} name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="Write something..." className="w-full border"></textarea>
            </div>
            <div>
                <input id="note-create-public" type="checkbox" defaultChecked={isPublic} name="isPublic" onChange={() => setIsPublic((state:any) => !state)} />
                <label htmlFor="note-create-public" className="select-none">Make it public</label>
            </div>
            <div>
                <button type="button" className="border select-none">Cancel</button>
                <button type="submit" className="border select-none">Save</button>
            </div>
        </form>
    )
}
