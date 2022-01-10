import React from 'react'
import type { NextPage } from 'next'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Home: NextPage = () => {
  const [search, setSearch] = React.useState('')
  const [encoded, setEncoded] = React.useState('')
  const [isCopied, setIsCopied] = React.useState(false)
  const [url, setUrl] = React.useState('')

  React.useEffect(() => {
    setEncoded(() => encodeURIComponent(search))
    setUrl(`https://news.google.com/rss/search?hl=de&gl=DE&ceid=DE%3Ade&q=${encoded}`)
  }, [search, setEncoded, encoded])

  return (
    <main className='mx-auto max-w-3xl px-10'>
      <div className='flex-1 flex-col flex h-screen'>
        <h1 className="text-3xl font-bold my-5">Generate Google RSS Feed URL From Search Terms</h1>
        <input className="w-full my-5 h-10" type="text" name="search" id="search" placeholder='Type in your tags' onChange={(event) => {
          event.preventDefault()
          setSearch(event.target.value)
        }} />
        <pre>{JSON.stringify({ search, encoded: encoded, rssURL: url }, null, 2)}</pre>
        <div className="w-full my-5">
          <label htmlFor="copyMe" className='my-5'>Copy to clipboard</label>
          <br />
          <div className='flex-1 flex-col justify-between align-middle'>
            <input
              className="border-solid border rounded w-[80%] py-2 px-4"
              type="text"
              disabled={true}
              placeholder="Enter some text"
              value={url}
              id="copyMe"
            />
            <CopyToClipboard text={url} onCopy={() => setIsCopied(true)}>
              <button
                className={isCopied || search === '' ? "ml-5 bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" : "ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
                disabled={isCopied || search === ''}
              >
                {isCopied ? 'Copied!' : 'Copy'}
              </button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
