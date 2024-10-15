package com.project.MedicalDiary.Repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;

@Repository
@Transactional
public class RoomReponsitory  extends JdbcDaoSupport {
    @Autowired
    public RoomReponsitory(DataSource dataSource) {
        this.setDataSource(dataSource);
    }

}
