import React, { useEffect, useState } from 'react'
import 'react-virtualized/styles.css'
import { Column, Table } from 'react-virtualized'
import Header from './components/Header'
import './App.css'

const App = () => {
  const [data, setData] = useState([])
  const [address, setAddress] = useState("0xA145ac099E3d2e9781C9c848249E2e6b256b030D")
  const [search, setSearch] = useState(false)

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(
          `https://api.ethplorer.io/getAddressInfo/${address}?apiKey=EK-6Wp9L-VMMtY3f-YCW7W`
        )
        const ethData = await res.json()
        setData(ethData)
      } catch (e) {
        console.log(e)
      }
    }
    fetchInfo()
  }, [search])

  return (
    <div>
      <Header eth={data.ETH} address={address} setAddress={setAddress} setSearch={setSearch} />
      <div className="tableWrapper">
        {data.length === 0 ? (
          <div>Loading...</div>
        ) : (
            <Table
              className="table"
              width={1200}
              height={1200}
              headerHeight={20}
              rowHeight={48}
              rowCount={data.tokens.length}
              rowGetter={({ index }) => data.tokens[index]}
            >
              <Column
                label="Token"
                dataKey="name"
                cellDataGetter={(info) =>
                  `${info.rowData.tokenInfo[info.dataKey] ||
                  info.rowData.tokenInfo.address
                  } (${info.rowData.tokenInfo.symbol || ''})`
                }
                width={400}
              />
              <Column
                width={400}
                label="Balance"
                dataKey="balance"
                cellDataGetter={(info) => info.rowData[info.dataKey]}
              />
              <Column
                width={400}
                label="Price"
                dataKey="price"
                cellDataGetter={(info) =>
                  info.rowData.tokenInfo[info.dataKey] ? `$ ${info.rowData.tokenInfo[info.dataKey].rate}` : "none"
                }
              />
            </Table>
          )}
      </div>
    </div>
  )
}

export default App
