import React from "react";

import {
  Header,
} from '@mantine/core';

export function Quote({
  quote,
  updateQuote,
  tempQuote,
  e,
  setTempQuote
}) {

  return <Header className={{position: 'relative' }} height={60} p="xs">
    <center>
      <div>
        <h3>Your quote: {quote || 'No quote found'}</h3>
        <form onSubmit={updateQuote}>
          <input type="text" name="quote" placeholder='Quote' value={tempQuote} onChange={e => setTempQuote(e.target.value)} />
          <input type="submit" value="Update quote" />
        </form>
      </div>

    </center>
  </Header>;
}
