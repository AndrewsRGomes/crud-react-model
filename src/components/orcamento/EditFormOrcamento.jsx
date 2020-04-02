import React, { useState, useEffect } from 'react'

const EdirFormOrcamento = props => {
  const [ row, setRow ] = useState(props.currentRow)

  useEffect(
    () => {
      setRow(props.currentRow)
    },
    [ props ]
  )
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  const handleInputChange = event => {
    const { name, value } = event.target

    setRow({ ...row, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        props.updateRow(row.id, row)
      }}
    >
      <div className="row">
        <div className="form-group col-md-6">
            <label>Name</label>
            <input className="form-control" type="text" name="name" value={row.name} onChange={handleInputChange} />
        </div>
        <div className="form-group col-md-6">
            <label>Username</label>
            <input className="form-control" type="text" name="username" value={row.username} onChange={handleInputChange} />
        </div>
        <div className="col-md-12 text-right">
            <button className="btn btn-light border border-secondary mr-2">Atualizar Processo</button>
            <button className="btn btn-light border border-secondary" 
             onClick={() => props.setEditing(false)} 
             >Cancelar</button>
        </div>
      </div>
    </form>
  )
}

export default EdirFormOrcamento