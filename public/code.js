import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/keymap/sublime'
import CodeMirror from 'codemirror'

import io from 'socket.io'

const RealTimeEditor = () => {

    const editor = CodeMirror.fromTextArea(
        document.getElementById('codeSection'),
            {
            lineNumbers: true,
            keyMap: 'sublime',
            theme: 'material-ocean',
            mode: 'javascript',
            }
    )

    const socket = io('http://localhost:3000')

}

var codeSection = 
CodeMirror.fromTextArea(document.getElementById('codeSection'),
    {
        mode: 'javascript',
        lineNumbers: true,
    }
)