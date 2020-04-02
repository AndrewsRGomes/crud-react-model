import React from 'react'

const Tabela = props => (
<div className="xs-12 table-responsive">
  <table className="table table-sm table-striped table-hover w-100">
    <thead>
    <tr>
      {props.ths.length > 0 ? (
        props.ths.map(th => (
            <th className="p-2 border" key={th.id}>{ th.thName }</th>
            ))
      ) : (
        <tr>
          <th colSpan={6}>Nenhum registro</th>
        </tr>
      )}
      </tr>
    </thead>
    <tbody>
      {props.rows.length > 0 ? (
        props.rows.map(row => (
        <React.Fragment>
          <tr key={row.id}>
            <td>{row.cliente}</td>
            <td>{row.processo}</td>
            <td>{row.valor}</td>
            <td>{row.taxa}</td>
            <td>{row.status}</td>
            <td>
              <button
                onClick={() => { props.editRow(row) }} className="btn btn-sm btn-warning mr-2" >
                <i class="fas fa-edit"></i>
              </button>
              <button onClick={() => props.deleteRow(row.id)} className="btn btn-sm btn-danger" >
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
          {/* <tr>
              <td colSpan={6}>
                  {row.detalhes}
                  </td>
          </tr> */}
          </React.Fragment>
          
        ))
      ) : (
        <tr>
          <td colSpan={6}>Nenhum registro</td>
        </tr>
      )}
    </tbody>
  </table>
</div>
)

export default Tabela