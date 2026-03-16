// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require('fs');
['.next'].forEach(dir => {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) {
      console.error(e)
    }
});
