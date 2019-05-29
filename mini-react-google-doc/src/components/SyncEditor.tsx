import React, { useState, useRef, useEffect } from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import mitt from 'mitt'

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
} as any)

interface Props { };

const emitter: mitt.Emitter = new mitt()



const SyncEditor: React.FC<Props> = () => {
    const [value, setValue] = useState(initialValue)
    const editor = useRef<Editor | null>(null);
    // const remote = useRef(null);

    useEffect(()=>{
        emitter.on('editorChange',()=>{
        })

    }, [])

    function editorChange(opts: any) {
        setValue(opts.value);
        console.log(opts.operations.filter((o:any)=>console.log(o)).toJS());
        emitter.emit('editorChange')
    }

    return <Editor ref={editor} value={value} onChange={editorChange} />
}

export default SyncEditor;