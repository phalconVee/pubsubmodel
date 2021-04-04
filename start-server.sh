#!/bin/sh
    /bin/sh -ec 'cd ./subscriber && npm start &'
    /bin/sh -ec 'cd ./publisher && npm start'