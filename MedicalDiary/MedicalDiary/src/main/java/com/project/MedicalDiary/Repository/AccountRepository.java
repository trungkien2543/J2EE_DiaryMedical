package com.project.MedicalDiary.Repository;


import com.project.MedicalDiary.Mapper.AccountMapper;
import com.project.MedicalDiary.Model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.repository.CrudRepository;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.sql.DataSource;
import java.util.List;

@Repository
@Transactional
public class AccountRepository extends JdbcDaoSupport {

    @Autowired
    public AccountRepository(DataSource dataSource) {
        this.setDataSource(dataSource);
    }

    public List<Account> getListAccount() {
        String sql = AccountMapper.BASE_SQL;

        Object[] params = new Object[]{};
        AccountMapper accountMapper = new AccountMapper();
        List<Account> list = this.getJdbcTemplate().query(sql, params, accountMapper);

        return list;
    }

    public Account getAccountByUserName(String userName) {
        String sql = AccountMapper.BASE_SQL + " where UserName = ?";  // Sử dụng ? làm placeholder

        Object[] params = new Object[]{ userName };  // Truyền tham số userName vào mảng params
        AccountMapper accountMapper = new AccountMapper();
        try{
            Account account = this.getJdbcTemplate().queryForObject(sql, params, accountMapper);
            return account;
        }catch (EmptyResultDataAccessException e){
            return null;
        }
    }


}
