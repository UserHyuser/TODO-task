FROM mongo:3.4.2

ENV AUTH yes
ENV STORAGE_ENGINE wiredTiger
ENV JOURNALING yes

COPY ./set_mongodb_password.sh /bin/set_mongodb_password.sh
RUN chmod a+x /bin/set_mongodb_password.sh

COPY ./run.sh /bin/run.sh
RUN chmod a+x /bin/run.sh
